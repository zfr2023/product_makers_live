'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { PageHeader } from '@/components/PageHeader'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <LayoutWrapper>

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        {/* Header */}
        <LayoutSection className="border-b py-6 bg-background">
          <LayoutContainer>
            <PageHeader
              title="Productos"
              description="Descubre los productos creados por makers."
            >
              {/* Search bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busca productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[240px] pl-10"
                />
              </div>
            </PageHeader>
          </LayoutContainer>
        </LayoutSection>

        {/* Product List */}
        <LayoutSection>
          <LayoutContainer>
            <AppList searchQuery={searchQuery} />
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
} 