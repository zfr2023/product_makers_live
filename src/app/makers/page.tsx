'use client'

import { Navbar } from '@/components/Navbar'
import { MakersList } from '@/components/MakersList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function MakersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Title and description */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 lowercase">the makers</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Meet our amazing makers building the future
                </p>
              </div>

              {/* Search bar */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search makers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[300px] pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Makers List */}
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4">
            <MakersList searchQuery={searchQuery} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 