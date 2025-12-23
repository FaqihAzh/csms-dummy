"use client"

import { useState } from 'react'
import { 
  Badge, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator, 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components'
import { RoleSwitcher } from '@/components/molecules/role-switcher/role-switcher'
import { useBreadcrumbs } from '@/lib/hooks/useBreadcrumbs'
import { Bell, LogOut, Settings, ChevronDown, Calendar } from 'lucide-react'
import { Avatar } from '@/components/atoms/avatar/avatar'

const ROLES = [
  { value: 'admin', label: 'ADMINISTRATOR' },
  { value: 'tim-prakualifikasi', label: 'TIM PRAKUALIFIKASI' },
  { value: 'pimpinan-unit', label: 'PIMPINAN UNIT' },
  { value: 'pejabat-pengendalian-k3l', label: 'PEJABAT PENGENDALIAN K3L' },
  { value: 'pimpinan-unit-induk', label: 'PIMPINAN UNIT INDUK' },
  { value: 'evp-k3l', label: 'EVP-K3L' },
  { value: 'pengawas-pekerjaan', label: 'PENGAWAS PEKERJAAN' },
  { value: 'pengawas-k3', label: 'PENGAWAS K3' },
  { value: 'k3l', label: 'K3L' },
  { value: 'admin-unit', label: 'ADMIN UNIT' },
]

export function Header() {
  const breadcrumbs = useBreadcrumbs()
  const [currentRole, setCurrentRole] = useState('admin')

  const handleRoleChange = (newRole: string) => {
    setCurrentRole(newRole)
  }

  return (
    <div className='bg-background px-6 h-16 border-b border-border'>
      <div className="flex justify-between items-center h-full">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <div key={crumb.href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-3">
            {/* Date */}
            <div className="flex items-center gap-2 mr-4">
                <Calendar className='size-4 text-muted-foreground' />
                <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
            </div>
            
          {/* Role Switcher */}
          <RoleSwitcher
            roles={ROLES}
            currentRole={currentRole}
            onRoleChange={handleRoleChange}
            className="w-64 max-w-full hover:bg-tranparent hover:text-accent-foreground hover:border-primary"
          />


          {/* Notification */}
          <div className="relative inline-flex hover:bg-accent transition-colors rounded-md">
            <button className="p-2">
              <Bell className='text-foreground' size={16}/>
            </button>
            <Badge 
              variant="extreme" 
              className="absolute fill-current -top-1 -right-1 px-1 min-w-[1.25rem] h-4 text-xs"
            >
              1
            </Badge>
          </div>

          {/* User Dropdown*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='group'>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
                
                <Avatar
                    fallback={"A"}
                    size="sm"
                />

                <div className="hidden md:flex flex-col items-start gap-1">
                  <span className="text-sm font-medium leading-tight">
                    Administrator
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    admin@csms.gov.id
                  </span>
                </div>

                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-56 border-0 py-2 px-3' align="end">
              <DropdownMenuLabel className='flex flex-col'>
                Administrator
                <span className='text-xs text-muted-foreground font-normal'>
                  admin@csms.gov.id
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className='text-accent-foreground' />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'>
                <LogOut className='text-destructive' />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}