'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VariantSelector } from '@/components/shadcn-studio/select/variant-selector'
import { QuantityStepper } from '@/components/shadcn-studio/input/quantity-stepper'
import { cn } from '@/lib/utils'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Copy, Check, Terminal, Monitor, Tablet, Smartphone } from "lucide-react"

interface ComponentDetailDrawerProps {
  isOpen: boolean
  onClose: () => void
  componentData: {
    id: string
    name: string
    category: string
    description: string
    status: string
    codeSnippet?: string
    demo?: React.ComponentType
  } | null
}

// Ponytail Config-Driven Viewport Matrix Registry
interface MatrixRow {
  label: string
  renderCell: (size: "default" | "sm" | "lg" | "xs" | "icon", viewport: 'desktop' | 'tablet' | 'mobile') => React.ReactNode
}

interface ComponentMatrixConfig {
  headers: {
    desktop: string
    tablet: string
    mobile: string
  }
  rows: MatrixRow[]
}

const MATRIX_CONFIGS: Record<string, ComponentMatrixConfig> = {
  button: {
    headers: {
      desktop: "Desktop View (Large)",
      tablet: "Tablet View (Default)",
      mobile: "HP / Mobile View (Full)",
    },
    rows: [
      {
        label: "Primary (Default)",
        renderCell: (size, viewport) => (
          <Button variant="default" size={size} className={viewport === 'mobile' ? 'w-full' : ''}>
            Primary CTA
          </Button>
        ),
      },
      {
        label: "Secondary",
        renderCell: (size, viewport) => (
          <Button variant="secondary" size={size} className={viewport === 'mobile' ? 'w-full' : ''}>
            Secondary
          </Button>
        ),
      },
      {
        label: "Outline",
        renderCell: (size, viewport) => (
          <Button variant="outline" size={size} className={viewport === 'mobile' ? 'w-full' : ''}>
            Outline Button
          </Button>
        ),
      },
      {
        label: "Ghost",
        renderCell: (size, viewport) => (
          <Button variant="ghost" size={size} className={viewport === 'mobile' ? 'w-full' : ''}>
            Ghost Action
          </Button>
        ),
      },
      {
        label: "Accent (Dusty Rose)",
        renderCell: (size, viewport) => (
          <Button variant="accent" size={size} className={viewport === 'mobile' ? 'w-full' : ''}>
            Accent CTA
          </Button>
        ),
      },
      {
        label: "Disabled",
        renderCell: (size, viewport) => (
          <Button variant="default" size={size} disabled className={viewport === 'mobile' ? 'w-full' : ''}>
            Disabled Action
          </Button>
        ),
      },
    ],
  },
  badge: {
    headers: {
      desktop: "Desktop View (Large)",
      tablet: "Tablet View (Default)",
      mobile: "HP / Mobile View (Pill Info)",
    },
    rows: [
      {
        label: "Primary (Default)",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Info</span>
              <Badge variant="default" className="text-[9px] px-1.5 py-0 font-semibold">Primary</Badge>
            </div>
          ) : (
            <Badge variant="default" className={cn("text-[10px] px-2 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              Primary
            </Badge>
          ),
      },
      {
        label: "Secondary",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Sage</span>
              <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-semibold">Secondary</Badge>
            </div>
          ) : (
            <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              Secondary
            </Badge>
          ),
      },
      {
        label: "Outline",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Buket</span>
              <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-semibold">Outline</Badge>
            </div>
          ) : (
            <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              Outline
            </Badge>
          ),
      },
      {
        label: "Accent",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Rose</span>
              <Badge variant="accent" className="text-[9px] px-1.5 py-0 font-semibold">Accent</Badge>
            </div>
          ) : (
            <Badge variant="accent" className={cn("text-[10px] px-2 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              Accent
            </Badge>
          ),
      },
      {
        label: "Destructive",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Alert</span>
              <Badge variant="destructive" className="text-[9px] px-1.5 py-0 font-semibold">Destructive</Badge>
            </div>
          ) : (
            <Badge variant="destructive" className={cn("text-[10px] px-2 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              Destructive
            </Badge>
          ),
      },
      {
        label: "Golden Hour (Premium)",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full border border-border/10">
              <span className="text-[10px] text-muted-foreground font-sans">Artisan</span>
              <Badge variant="golden-hour" className="text-[9px] px-1.5 py-0 font-semibold">Golden Hour</Badge>
            </div>
          ) : (
            <Badge variant="golden-hour" className={cn("text-[10px] px-2.5 py-0.5 font-semibold", size === 'lg' ? 'scale-110' : '')}>
              ❀ Golden Hour
            </Badge>
          ),
      },
    ],
  },
  input: {
    headers: {
      desktop: "Desktop View",
      tablet: "Tablet View",
      mobile: "HP / Mobile View (Full)",
    },
    rows: [
      {
        label: "Default Text Input",
        renderCell: (size, viewport) => (
          <Input
            type="text"
            placeholder="Cari buket di Makassar..."
            className={viewport === 'mobile' ? 'w-full' : 'max-w-[200px]'}
          />
        ),
      },
      {
        label: "Password Input",
        renderCell: (size, viewport) => (
          <Input
            type="password"
            value="shh-secret"
            readOnly
            className={viewport === 'mobile' ? 'w-full' : 'max-w-[200px]'}
          />
        ),
      },
      {
        label: "Invalid Status",
        renderCell: (size, viewport) => (
          <Input
            type="text"
            placeholder="Format salah..."
            aria-invalid="true"
            className={viewport === 'mobile' ? 'w-full' : 'max-w-[200px]'}
          />
        ),
      },
      {
        label: "Disabled State",
        renderCell: (size, viewport) => (
          <Input
            type="text"
            placeholder="Input Terkunci..."
            disabled
            className={viewport === 'mobile' ? 'w-full' : 'max-w-[200px]'}
          />
        ),
      },
    ],
  },
  label: {
    headers: {
      desktop: "Desktop View",
      tablet: "Tablet View",
      mobile: "HP / Mobile View (Field Layout)",
    },
    rows: [
      {
        label: "Standard Label",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex flex-col gap-1 text-left w-full max-w-[180px]">
              <Label>Nama Toko Kreator</Label>
              <span className="text-[10px] text-muted-foreground font-sans lowercase">Nama usaha Anda</span>
            </div>
          ) : (
            <Label>Nama Toko Kreator</Label>
          ),
      },
      {
        label: "Required Field",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex flex-col gap-1 text-left w-full max-w-[180px]">
              <Label>
                Nama Toko Kreator <span className="text-destructive font-serif">*</span>
              </Label>
              <span className="text-[10px] text-muted-foreground font-sans lowercase">Wajib diisi</span>
            </div>
          ) : (
            <Label>
              Nama Toko Kreator <span className="text-destructive font-serif">*</span>
            </Label>
          ),
      },
      {
        label: "With Decorative Icon",
        renderCell: (size, viewport) =>
          viewport === "mobile" ? (
            <div className="flex flex-col gap-1 text-left w-full max-w-[180px]">
              <Label className="gap-1 flex items-center">
                Nama Toko Kreator <span className="text-accent text-[10px]">❀</span>
              </Label>
              <span className="text-[10px] text-muted-foreground font-sans lowercase">Signature Bicket</span>
            </div>
          ) : (
            <Label className="gap-1 flex items-center">
              Nama Toko Kreator <span className="text-accent text-[10px]">❀</span>
            </Label>
          ),
      },
    ],
  },
  "variant-selector": {
    headers: {
      desktop: "Desktop View",
      tablet: "Tablet View",
      mobile: "HP / Mobile View (Full)",
    },
    rows: [
      {
        label: "Default Variant Selector",
        renderCell: (size, viewport) => (
          <div className={viewport === 'mobile' ? 'w-full' : 'max-w-[220px]'}>
            <VariantSelector
              label="Ukuran Buket ❀"
              options={[
                { id: "s", name: "Kecil (S) - 5 Tangkai", badgeText: "Hemat" },
                { id: "m", name: "Sedang (M) - 10 Tangkai", badgeText: "Populer", priceAdjustment: 25000 },
              ]}
              value="m"
              onChange={() => {}}
            />
          </div>
        ),
      },
    ],
  },
  "quantity-stepper": {
    headers: {
      desktop: "Desktop View",
      tablet: "Tablet View",
      mobile: "HP / Mobile View (Centered)",
    },
    rows: [
      {
        label: "Quantity Controller",
        renderCell: (_size, _viewport) => (
          <QuantityStepper
            value={3}
            onChange={() => {}}
            min={1}
            max={10}
          />
        ),
      },
    ],
  },
}

export function ComponentDetailDrawer({ isOpen, onClose, componentData }: ComponentDetailDrawerProps) {
  const [copied, setCopied] = React.useState(false)
  const [drawerMode, setDrawerMode] = React.useState<'visual' | 'code'>('visual')

  if (!componentData) return null

  const handleCopy = () => {
    if (componentData.codeSnippet) {
      navigator.clipboard.writeText(componentData.codeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const DemoComponent = componentData.demo
  const matrixConfig = MATRIX_CONFIGS[componentData.id]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-background border-t border-border/40 rounded-t-[32px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="mx-auto w-full max-w-5xl px-6 py-4 flex-1 flex flex-col overflow-y-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/10 pb-4 mb-6 gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-accent font-sans bg-accent/10 px-2.5 py-0.5 rounded-full">
                  {componentData.category}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-primary font-sans bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {componentData.status}
                </span>
              </div>
              <h2 className="text-3xl font-serif text-foreground font-semibold mt-1">
                {componentData.name} Showcase ❀
              </h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                {componentData.description}
              </p>
            </div>

            {/* Toggle Mode and Close action */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border/20">
                <Button
                  variant={drawerMode === 'visual' ? 'default' : 'ghost'}
                  className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
                  onClick={() => setDrawerMode('visual')}
                >
                  Visual Matrix ❀
                </Button>
                <Button
                  variant={drawerMode === 'code' ? 'default' : 'ghost'}
                  className="h-8 text-xs font-semibold px-3 rounded-lg cursor-pointer"
                  onClick={() => setDrawerMode('code')}
                >
                  Developer Code ⌨
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="outline" size="sm" className="rounded-xl border-border/40 hover:bg-muted font-semibold text-xs h-8 cursor-pointer">
                  Close Panel
                </Button>
              </DrawerClose>
            </div>
          </motion.div>

          {/* Drawer Body content */}
          <div className="flex-1 flex flex-col">
            {drawerMode === 'visual' ? (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex-1 flex flex-col gap-4"
              >
                {matrixConfig ? (
                  <div className="flex flex-col gap-6 w-full">
                    {/* Unified Generic Matrix Table */}
                    <div className="overflow-x-auto w-full border border-border/20 rounded-3xl bg-card/40 p-4 shadow-soft">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-border/20">
                            <th className="p-4 text-xs font-bold font-sans uppercase tracking-wider text-muted-foreground">Varian / Status</th>
                            <th className="p-4 text-xs font-bold font-sans uppercase tracking-wider text-muted-foreground text-center">
                              <span className="flex items-center justify-center gap-1.5"><Monitor className="w-3.5 h-3.5" /> {matrixConfig.headers.desktop}</span>
                            </th>
                            <th className="p-4 text-xs font-bold font-sans uppercase tracking-wider text-muted-foreground text-center">
                              <span className="flex items-center justify-center gap-1.5"><Tablet className="w-3.5 h-3.5" /> {matrixConfig.headers.tablet}</span>
                            </th>
                            <th className="p-4 text-xs font-bold font-sans uppercase tracking-wider text-muted-foreground text-center">
                              <span className="flex items-center justify-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> {matrixConfig.headers.mobile}</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/10">
                          {matrixConfig.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-muted/5 transition-colors">
                              <td className="p-4 font-serif font-semibold text-foreground text-sm">{row.label}</td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center">
                                  {row.renderCell('lg', 'desktop')}
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <div className="flex justify-center">
                                  {row.renderCell('default', 'tablet')}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="w-[180px] mx-auto flex justify-center">
                                  {row.renderCell('sm', 'mobile')}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  /* Default fallback preview for non-matrix components */
                  <div className="flex flex-col gap-3 flex-1 min-h-[350px]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/75 uppercase tracking-wider font-sans">
                      <Terminal className="w-3.5 h-3.5 text-primary" /> Live Preview Sandbox
                    </div>
                    <div className="flex-1 bg-card/60 border border-border/40 rounded-3xl flex items-center justify-center p-8 relative overflow-hidden shadow-soft">
                      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20 rounded-tr-3xl" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/20 rounded-bl-3xl" />
                      
                      {DemoComponent ? (
                        <div className="w-full flex justify-center scale-110 md:scale-120 transition-all duration-300">
                          <DemoComponent />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground font-serif">No Demo Component Available</span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Code block snippet mode */
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex-1 flex flex-col gap-3 min-h-[350px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground/75 uppercase tracking-wider font-sans">
                    <span>How To Use & Import</span>
                  </div>
                  {componentData.codeSnippet && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="h-8 gap-1.5 px-3 rounded-xl text-xs border-border/40 hover:bg-muted font-semibold transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-primary" /> Copy Code
                        </>
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="flex-1 bg-zinc-950 text-zinc-200 rounded-3xl p-5 font-mono text-xs overflow-x-auto shadow-inner border border-zinc-800/50 leading-relaxed select-all">
                  <pre>{componentData.codeSnippet || "No Code Snippet Available"}</pre>
                </div>
              </motion.div>
            )}
          </div>

          <DrawerFooter className="mt-8 border-t border-border/10 pt-4 flex flex-row items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest select-none">
              Bicket UI Design System ❀ Art Nouveau Core
            </span>
            <DrawerClose asChild>
              <Button variant="default" className="rounded-lg px-6 bg-primary text-primary-foreground font-bold text-xs h-9 cursor-pointer">
                Return to Gallery
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
