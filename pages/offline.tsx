import Head from 'next/head'
import Link from 'next/link'

export default function Offline() {
  return (
    <>
      <Head>
        <title>You're Offline - Financial Empire</title>
        <meta name="description" content="You're currently offline. Some features may not be available." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">You're Offline</h1>
            <p className="text-gray-600 mb-6">
              It looks like you've lost your internet connection. Don't worry - you can still access some features of Financial Empire.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/dashboard"
              className="inline-block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </Link>
            
            <button 
              onClick={() => window.location.reload()}
              className="inline-block w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <h3 className="font-medium mb-2">Available Offline:</h3>
            <ul className="space-y-1">
              <li>• View cached dashboard</li>
              <li>• Access learning materials</li>
              <li>• Review portfolio history</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}