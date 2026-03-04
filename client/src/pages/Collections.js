import React from 'react';

function Collections() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Waste Collections</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>All</option>
              <option>Scheduled</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>All</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <button className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add New Collection
        </button>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Collection ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Source</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Waste Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 text-sm">COL-001</td>
                <td className="px-4 py-3 text-sm">Residential</td>
                <td className="px-4 py-3 text-sm">Mixed</td>
                <td className="px-4 py-3 text-sm">150 kg</td>
                <td className="px-4 py-3 text-sm"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                <td className="px-4 py-3 text-sm">2026-02-18</td>
                <td className="px-4 py-3 text-sm">
                  <button className="text-blue-600 hover:underline">Edit</button> | 
                  <button className="text-red-600 hover:underline ml-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Collections;
