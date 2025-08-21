export default function ProfileEdit({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-gray-100 p-8">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Edit Profile
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              defaultValue={user?.first_name}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={user?.last_name}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Address
            </label>
            <textarea
              defaultValue={user?.address}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}