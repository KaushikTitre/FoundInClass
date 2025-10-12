import React, { useState, useEffect } from 'react';
import { Search, Package, CheckCircle, Bell, MapPin, Lock, Unlock, AlertCircle } from 'lucide-react';
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { client } from "../../api/auth";
import { dashboardData } from '../../api/getData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        await client();
        const response = await dashboardData();
        
        console.log("API Response:", response.data);
        
        // Extract data from response
        const apiData = response.data.data || [];
        
        if (!Array.isArray(apiData)) {
          console.error("API data is not an array:", apiData);
          setError("Invalid data format received from server");
          setLoading(false);
          return;
        }
        
        // Transform API data to dashboard format
        const transformedItems = apiData.map(item => ({
          id: item._id,
          name: item.type === 'lost' ? item.lItemName : item.fItemName,
          category: item.type === 'lost' ? item.lCategory : item.fCategory,
          description: item.type === 'lost' ? item.lDescription : item.fDescription,
          type: item.type,
          status: item.status,
          stage: getStageFromStatus(item.status),
          datePosted: item.type === 'lost' 
            ? new Date(item.lDateLost).toLocaleDateString() 
            : new Date(item.fDateFound).toLocaleDateString(),
          time: item.type === 'lost' ? item.lApproxTime : item.fApproxTime,
          location: item.type === 'lost' ? item.lLocation : item.fLocation,
          image: item.type === 'lost' ? item.lImage : item.fImage,
          verified: ['verified', 'Location_Released', 'GetPayment', 'handover', 'Payment', 'Collect'].includes(item.status),
          paid: ['Location_Released', 'GetPayment', 'handover', 'Collect'].includes(item.status),
          matchDate: item.status !== 'open' ? new Date().toLocaleDateString() : null
        }));
        
        setItems(transformedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.response?.data?.error || error.message || "Failed to load dashboard data");
        setLoading(false);
        
        // Only redirect to login if it's an authentication error
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
      }
    };
    fetchClient();
  }, [navigate]);

  const getStageFromStatus = (status) => {
    switch(status) {
      case 'open':
        return 0;
      case 'matched':
        return 1;
      case 'verified':
      case 'Payment':
        return 2;
      case 'Location_Released':
      case 'GetPayment':
      case 'handover':
      case 'Collect':
        return 3;
      default:
        return 0;
    }
  };

  const stats = {
    activeLost: items.filter(i => i.type === 'lost' && !i.verified).length,
    activeFound: items.filter(i => i.type === 'found' && !i.verified).length,
    matched: items.filter(i => i.verified).length
  };

  const handleVerify = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: 'verification', stage: 2, verified: true }
        : item
    ));
  };

  const handlePayment = (itemId) => {
    setShowPayment(itemId);
  };

  const completePayment = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, paid: true, stage: 3, status: 'verified' }
        : item
    ));
    setShowPayment(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'open':
        return 'bg-gray-100 text-gray-700';
      case 'matched':
        return 'bg-yellow-100 text-yellow-700';
      case 'verified':
      case 'Payment':
        return 'bg-blue-100 text-blue-700';
      case 'Location_Released':
      case 'GetPayment':
      case 'handover':
      case 'Collect':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'open':
        return 'Searching';
      case 'matched':
        return 'Potential Match Found';
      case 'verified':
        return 'Verification Pending';
      case 'Payment':
        return 'Payment Required';
      case 'Location_Released':
      case 'Collect':
        return 'Location Released';
      case 'GetPayment':
      case 'handover':
        return 'Verified / Returned';
      default:
        return 'Unknown';
    }
  };

  const stages = [
    { name: 'Posted', color: 'bg-gray-400' },
    { name: 'Matched', color: 'bg-yellow-400' },
    { name: 'Verification', color: 'bg-blue-500' },
    { name: 'Location Released', color: 'bg-green-500' }
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Track your lost and found items</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{stats.activeLost}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Your Active Lost Items</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{stats.activeFound}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Your Active Found Items</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-gray-800">{stats.matched}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Items Returned</h3>
            </div>
          </div>

          {/* My Items Status Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Items Status</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No items posted yet</p>
                <p className="text-gray-400 text-sm mt-2">Start by posting a lost or found item</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                          {item.status === 'matched' && !item.verified && (
                            <Bell className="w-5 h-5 text-yellow-500 animate-pulse" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="font-medium">{item.category}</span>
                          <span>•</span>
                          <span className="capitalize">{item.type}</span>
                          <span>•</span>
                          <span>Posted: {item.datePosted}</span>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    {/* Progress Tracker */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        {stages.map((stage, idx) => (
                          <React.Fragment key={idx}>
                            <div className="flex flex-col items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                idx <= item.stage ? stage.color : 'bg-gray-200'
                              } transition-all duration-500`}>
                                {idx <= item.stage && (
                                  <CheckCircle className="w-5 h-5 text-white" />
                                )}
                              </div>
                              <span className="text-xs mt-2 text-gray-600 text-center">{stage.name}</span>
                            </div>
                            {idx < stages.length - 1 && (
                              <div className={`flex-1 h-1 mx-2 ${
                                idx < item.stage ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                              } transition-all duration-500`} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      {item.status === 'matched' && !item.verified && (
                        <button
                          onClick={() => handleVerify(item.id)}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          Verify Item Match
                        </button>
                      )}
                      
                      {item.verified && !item.paid && (
                        <button
                          onClick={() => handlePayment(item.id)}
                          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          Unlock Location (Pay)
                        </button>
                      )}
                      
                      {item.paid && (
                        <div className="flex items-center gap-2 px-6 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                          <Unlock className="w-4 h-4" />
                          Location Available
                          <MapPin className="w-4 h-4 ml-2" />
                          <span className="ml-2 text-sm">{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Payment Modal */}
                    {showPayment === item.id && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                        <div className="flex items-start gap-3 mb-4">
                          <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Payment Required</h4>
                            <p className="text-sm text-gray-600 mb-4">
                              To unlock the location details of your matched item, please complete the payment of <strong>₹99</strong>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => completePayment(item.id)}
                            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md"
                          >
                            Complete Payment
                          </button>
                          <button
                            onClick={() => setShowPayment(null)}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Privacy Protected</h3>
                <p className="text-sm text-gray-600">
                  Your dashboard only displays your personal items. Location details are only revealed after verification and payment to ensure safety for all users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;