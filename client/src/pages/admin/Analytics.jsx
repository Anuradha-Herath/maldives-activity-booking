import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30days');
    const [analyticsData, setAnalyticsData] = useState({});

    // Dummy analytics data
    useEffect(() => {
        setTimeout(() => {
            setAnalyticsData({
                overview: {
                    totalBookings: 1247,
                    totalRevenue: 2850000,
                    totalUsers: 8934,
                    conversionRate: 3.2
                },
                bookingStats: {
                    activities: { count: 589, revenue: 850000 },
                    accommodation: { count: 423, revenue: 1650000 },
                    packages: { count: 235, revenue: 350000 }
                },
                topDestinations: [
                    { name: 'Malé', bookings: 245, revenue: 580000 },
                    { name: 'Baa Atoll', bookings: 198, revenue: 720000 },
                    { name: 'Ari Atoll', bookings: 156, revenue: 445000 },
                    { name: 'Lhaviyani Atoll', bookings: 134, revenue: 390000 },
                    { name: 'Noonu Atoll', bookings: 98, revenue: 280000 }
                ],
                monthlyTrends: [
                    { month: 'Jan', bookings: 89, revenue: 245000 },
                    { month: 'Feb', bookings: 125, revenue: 315000 },
                    { month: 'Mar', bookings: 156, revenue: 425000 },
                    { month: 'Apr', bookings: 198, revenue: 520000 },
                    { month: 'May', bookings: 234, revenue: 680000 },
                    { month: 'Jun', bookings: 267, revenue: 750000 }
                ],
                userAnalytics: {
                    newUsers: 234,
                    returningUsers: 156,
                    averageBookingValue: 2285,
                    topSourceCountries: ['USA', 'UK', 'Germany', 'Australia', 'France']
                },
                performanceMetrics: {
                    websiteTraffic: 45230,
                    bounceRate: 24.5,
                    avgSessionDuration: '4:32',
                    pageViews: 128945
                }
            });
            setLoading(false);
        }, 1000);
    }, [dateRange]);

    const StatCard = ({ title, value, subtitle, icon, color, growth }) => (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <i className={`${icon} text-white text-lg`}></i>
                </div>
            </div>
            {growth && (
                <div className="mt-4 flex items-center">
                    <span className={`text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <i className={`fas ${growth > 0 ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                        {Math.abs(growth)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last period</span>
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                        <p className="text-gray-600">Business intelligence and performance metrics</p>
                    </div>
                    <div className="flex space-x-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="7days">Last 7 days</option>
                            <option value="30days">Last 30 days</option>
                            <option value="90days">Last 3 months</option>
                            <option value="1year">Last year</option>
                        </select>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <i className="fas fa-download mr-2"></i>
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Bookings"
                        value={analyticsData.overview?.totalBookings?.toLocaleString()}
                        icon="fas fa-calendar-check"
                        color="bg-blue-500"
                        growth={12.5}
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`$${(analyticsData.overview?.totalRevenue / 1000000).toFixed(1)}M`}
                        icon="fas fa-dollar-sign"
                        color="bg-green-500"
                        growth={18.2}
                    />
                    <StatCard
                        title="Active Users"
                        value={analyticsData.overview?.totalUsers?.toLocaleString()}
                        icon="fas fa-users"
                        color="bg-purple-500"
                        growth={8.7}
                    />
                    <StatCard
                        title="Conversion Rate"
                        value={`${analyticsData.overview?.conversionRate}%`}
                        icon="fas fa-chart-line"
                        color="bg-orange-500"
                        growth={-2.1}
                    />
                </div>

                {/* Revenue Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Booking Categories */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Category</h3>
                        <div className="space-y-4">
                            {Object.entries(analyticsData.bookingStats || {}).map(([category, data]) => (
                                <div key={category} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                                        <span className="text-sm font-medium text-gray-900 capitalize">
                                            {category}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">
                                            ${data.revenue?.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {data.count} bookings
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Destinations */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
                        <div className="space-y-4">
                            {analyticsData.topDestinations?.map((destination, index) => (
                                <div key={destination.name} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                            {index + 1}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {destination.name}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">
                                            ${destination.revenue?.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {destination.bookings} bookings
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monthly Trends */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {analyticsData.monthlyTrends?.map((month) => (
                            <div key={month.month} className="text-center p-4 border border-gray-200 rounded-lg">
                                <div className="text-sm font-medium text-gray-600">{month.month}</div>
                                <div className="text-lg font-bold text-gray-900 mt-1">{month.bookings}</div>
                                <div className="text-xs text-gray-500">bookings</div>
                                <div className="text-sm font-semibold text-green-600 mt-2">
                                    ${(month.revenue / 1000).toFixed(0)}K
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Analytics & Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Analytics */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Analytics</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">New Users</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.userAnalytics?.newUsers}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Returning Users</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.userAnalytics?.returningUsers}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Avg. Booking Value</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    ${analyticsData.userAnalytics?.averageBookingValue}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-200">
                                <div className="text-sm text-gray-600 mb-2">Top Source Countries</div>
                                <div className="flex flex-wrap gap-2">
                                    {analyticsData.userAnalytics?.topSourceCountries?.map((country) => (
                                        <span key={country} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                            {country}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Performance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Website Traffic</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.performanceMetrics?.websiteTraffic?.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Bounce Rate</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.performanceMetrics?.bounceRate}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Avg. Session Duration</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.performanceMetrics?.avgSessionDuration}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Page Views</span>
                                <span className="text-sm font-semibold text-gray-900">
                                    {analyticsData.performanceMetrics?.pageViews?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                            <i className="fas fa-file-pdf text-red-500 text-xl mb-2"></i>
                            <div className="text-sm font-medium text-gray-900">Export PDF</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                            <i className="fas fa-file-excel text-green-500 text-xl mb-2"></i>
                            <div className="text-sm font-medium text-gray-900">Export Excel</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                            <i className="fas fa-envelope text-blue-500 text-xl mb-2"></i>
                            <div className="text-sm font-medium text-gray-900">Email Report</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                            <i className="fas fa-calendar text-purple-500 text-xl mb-2"></i>
                            <div className="text-sm font-medium text-gray-900">Schedule Report</div>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAnalytics;
