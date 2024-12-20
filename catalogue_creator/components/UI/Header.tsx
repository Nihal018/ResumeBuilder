export function Header() {
  return (
    <header className="bg-gray-50 border-b h-16 flex-shrink-0 top-0 z-50 ">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16">
          {/* Logo/Brand */}
          <div className="flex items-center ml-6 ">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900 ">
              Resume Builder
            </h1>
          </div>

          {/* Right side actions */}
          {/* <div className="flex items-center space-x-4 ">
            <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Templates
            </button>
            <button className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Examples
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Download PDF
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
}
