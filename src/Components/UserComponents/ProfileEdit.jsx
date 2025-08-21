export default function ProfileEdit({ user }) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
              
              {/* Header */}
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Edit Profile
              </h2>
      
              {/* Form */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.first_name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
      
                <div>
                  <label className="block text-gray-600 mb-1 text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.last_name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
      
                <div className="md:col-span-2">
                  <label className="block text-gray-600 mb-1 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
      
                <div className="md:col-span-2">
                  <label className="block text-gray-600 mb-1 text-sm font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={user.address}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
      
                {/* Buttons */}
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
      
  
  