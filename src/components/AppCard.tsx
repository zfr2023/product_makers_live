'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Globe, Github, ThumbsUp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from '@/components/ui/button'
import { LinkSocial } from '@/components/LinkSocial'
import { App, ExternalLinks } from '@/lib/types'
import { hasVotedToday, toggleVote } from '@/lib/utils'

// Extended App Card Props to include the additional fields from App profile
interface AppCardProps extends Omit<App, 'externalLinks' | 'makers'> {
  externalLinks?: ExternalLinks
  makers?: Array<{
    name: string
    role: string
    avatar: string
    joinedDate: string
  }>
  onUpvote?: () => void
  ranking?: number
}

export const AppCard: FC<AppCardProps> = ({
  id,
  name,
  tagline,
  description,
  imageUrl,
  votes: initialVotes,
  badges = [],
  tags = [],
  commentsCount = 0,
  externalLinks,
  makers = [],
  onUpvote,
  ranking,
}) => {
  const [votes, setVotes] = useState(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    setHasVoted(hasVotedToday(id))
  }, [id])

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newVoteState = toggleVote(id)
    setHasVoted(newVoteState)
    setVotes(prev => newVoteState ? prev + 1 : prev - 1)
    onUpvote?.()
  }

  return (
    <Card data-testid={`app-card-${id}`}
    >
      <CardHeader className="gap-0 p-6">
        <div className="flex flex-col md:flex-row items-start gap-4 relative">
          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border p-0 relative">
              <img src={imageUrl} alt={name} className="h-full w-full object-contain" />
            </div>
            {ranking && (
              <Badge variant="primary">#{ranking}</Badge>
            )}
          </div>
          <div className="flex flex-col flex-1 gap-1.5">
            <CardTitle className="flex items-center gap-2 text-base">
              <Link href={`/app/${id}`} className="block space-y-1 gap-0 lg:flex lg:gap-1 lg:space-y-0">
                <span className="font-bold">{name}</span>
                <span className="font-medium hidden lg:flex">—</span>
                <span className="line-clamp-1 font-medium">{tagline}</span>

              </Link>
            </CardTitle>
            <CardDescription>
              <p className="line-clamp-1">{description}</p>
              <div className="flex flex-wrap gap-1 mt-3.5">
                {badges.includes('trending') && (
                  <Badge variant="trending" className="mr-2">Trending</Badge>
                )}
                {badges.includes('new') && (
                  <Badge variant="new" className="mr-2">Novedad</Badge>
                )}
                {externalLinks?.website && (
                  <Badge variant="secondary">Web</Badge>
                )}
                {externalLinks?.appStore && (
                  <Badge variant="secondary">iOS</Badge>
                )}
                {externalLinks?.playStore && (
                  <Badge variant="secondary">Android</Badge>
                )}
              </div>
              {makers.length > 0 && (
                <div className="flex items-center mt-4">
                  <div className="flex -space-x-2 mr-2">
                    {makers.slice(0, 3).map((m, i) => (
                      <Avatar key={i} className="size-6 rounded-full overflow-hidden border-2 border-background">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback className="text-xs bg-muted-foreground text-background">{m.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Creado por {makers.map((m, i) => (
                      <HoverCard key={i} openDelay={0} closeDelay={0}>
                        <HoverCardTrigger>
                          <Link href={`/maker/${m.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground transition-colors">
                            {m.name}
                          </Link>
                          {i < makers.length - 1 ? ', ' : ''}
                        </HoverCardTrigger>
                        <HoverCardContent sideOffset={8} className="w-auto max-w-80 pr-4">
                          <div className="flex gap-3">
                            <Avatar className="size-10 rounded-md">
                              <AvatarImage src={m.avatar} />
                              <AvatarFallback>{m.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <h4 className="text-sm font-semibold">{m.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {m.role}
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </span>
                </div>
              )}
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 md:relative md:flex flex-shrink-0">
            <div className="flex gap-2">
              <Link href={`/app/${id}#comments`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      className="size-14 flex-col gap-1 text-xs"
                    >
                      <MessageCircle size={20} />
                      <span>{commentsCount}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Ver comentarios
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleUpvote}
                    aria-label={hasVoted ? "Quitar el voto" : "Votar"}
                    className={`size-14 flex-col gap-1 text-xs ${hasVoted
                      ? 'bg-brand-blue/10 hover:bg-brand-blue/20 dark:bg-brand-blue dark:hover:bg-brand-blue/90 text-brand-blue dark:text-white'
                      : ''
                      }`}
                  >
                    <ThumbsUp size={20} />
                    <span>{votes}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {hasVoted ? "Quitar el voto" : "Votar este producto"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="hidden flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6 border-t py-4 px-6">
        {makers.length > 0 && (
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {makers.slice(0, 3).map((m, i) => (
                <Avatar key={i} className="size-6 rounded-full overflow-hidden border-2 border-background">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback className="text-xs bg-muted-foreground text-background">{m.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              By {makers.map((m, i) => (
                <HoverCard key={i} openDelay={0} closeDelay={0}>
                  <HoverCardTrigger>
                    <Link href={`/maker/${m.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-foreground transition-colors">
                      {m.name}
                    </Link>
                    {i < makers.length - 1 ? ', ' : ''}
                  </HoverCardTrigger>
                  <HoverCardContent sideOffset={8} className="w-auto max-w-80 pr-4">
                    <div className="flex gap-3">
                      <Avatar className="size-10 rounded-md">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback>{m.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{m.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </span>
          </div>
        )}
        <div className="hidden md:flex items-center gap-6">
          {externalLinks?.website && (
            <LinkSocial
              href={externalLinks.website}
              icon={<Globe size={16} />}
              name="Website"
            />
          )}
          {externalLinks?.github && (
            <LinkSocial
              href={externalLinks.github}
              icon={<Github size={16} />}
              name="GitHub"
            />
          )}
        </div>
      </CardFooter>
    </Card >
  )
} 