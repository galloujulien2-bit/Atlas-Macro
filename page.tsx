'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Zap,
  Settings,
  Monitor,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Cpu,
  Lock,
  Clock,
  AlertTriangle,
  FolderOpen,
  FileArchive,
  MousePointerClick,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function Home() {
  const [downloading, setDownloading] = useState(false)

  // Path to the .zip served from /public/download/
  const DOWNLOAD_URL = "/download/Atlas-Macro.zip"

  const handleDownload = (version: string) => {
    setDownloading(true)
    toast({
      title: "Download started",
      description: `Atlas Macro ${version} — Your download will begin shortly.`,
    })

    // Verify the file exists, then trigger a real download
    fetch(DOWNLOAD_URL, { method: "HEAD" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("not_found")
        }
        // File exists — trigger the real download
        const a = document.createElement("a")
        a.href = DOWNLOAD_URL
        a.download = "Atlas-Macro.zip"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => {
          setDownloading(false)
          toast({
            title: "Download complete",
            description: "Check your downloads folder.",
          })
        }, 1500)
      })
      .catch(() => {
        setDownloading(false)
        toast({
          title: "File not available yet",
          description:
            "The .zip file is not in /public/download/ yet. Please upload Atlas-Macro.zip first.",
          variant: "destructive",
        })
      })
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50 animate-slide-down">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="logo-wrapper">
              <span className="logo-glow" aria-hidden="true" />
              <div className="logo-3d">A</div>
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight">Atlas Macro</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              v2.4.0
            </Badge>
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild className="btn-ghost-slide">
              <a href="#features">Features</a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="btn-ghost-slide hidden sm:inline-flex">
              <a href="#download">Download</a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container relative mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight animate-fade-up">
              <span className="gradient-text">Atlas Macro</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed animate-fade-up delay-200">
              A discreet and smooth Blade Ball macro.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-300">
              <Button
                size="lg"
                className="btn-shine btn-glow w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/30"
                onClick={() => handleDownload("v2.4.0")}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download for free
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-outline-sweep w-full sm:w-auto h-12 px-8 text-base border-border/60 bg-background/40 backdrop-blur-sm"
                asChild
              >
                <a href="#features">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 text-sm text-muted-foreground animate-fade-up delay-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Free
              </div>
              <div className="flex items-center gap-1.5">
                <Monitor className="h-4 w-4 text-primary" />
                Windows 10/11
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14">
            <Badge variant="secondary" className="mb-3 animate-fade-in">Features</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight animate-fade-up">
              Built to give you the best
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground animate-fade-up delay-100">
              Every detail of Atlas Macro has been crafted to deliver a smooth,
              performant, and seamless experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: Zap,
                title: "Optimized performance",
                desc: "A lightweight, fast macro that never slows down your system. Instant startup, smooth execution.",
              },
              {
                icon: Settings,
                title: "Easy configuration",
                desc: "Clear, intuitive interface. Customize every action in just a few clicks.",
              },
              {
                icon: Cpu,
                title: "Low footprint",
                desc: "Under 5 MB in memory, 0% CPU usage at idle. A macro that respects your machine.",
              },
              {
                icon: Lock,
                title: "Stealth mode",
                desc: "Atlas Macro is discreet. It runs silently in the background without disrupting your system or drawing attention.",
              },
              {
                icon: Clock,
                title: "Regular updates",
                desc: "Frequent improvements and new features added every month, completely free.",
              },
            ].map((feat, i) => (
              <Card
                key={feat.title}
                className={`card-lift group relative overflow-hidden border-border/40 bg-card/60 backdrop-blur-md animate-scale-in delay-${(i + 1) * 100}`}
              >
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground icon-pop">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4 text-lg">{feat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download + Tutorial Section */}
      <section
        id="download"
        className="py-16 sm:py-24 lg:py-28 border-t border-border/40"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-10 sm:mb-12">
              <Badge variant="secondary" className="mb-3 animate-fade-in">Download</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight animate-fade-up">
                Download Atlas Macro
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto animate-fade-up delay-100">
                Get the latest version and follow the tutorial to get started
                in minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              {/* Windows download */}
              <Card className="card-lift relative overflow-hidden border-primary/40 bg-card/70 backdrop-blur-md flex flex-col animate-scale-in">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30 icon-pop">
                      <Monitor className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="bg-primary/10 border-primary/40 text-primary">
                      Recommended
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">Windows</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4">
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      Compatible with Windows 10 / 11 (64-bit)
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      Size: 4.7 MB
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      Version 2.4.0
                    </div>
                  </div>
                  <div className="mt-auto pt-2">
                    <Button
                      className="btn-shine btn-glow w-full h-11"
                      size="lg"
                      onClick={() => handleDownload("Windows v2.4.0")}
                      disabled={downloading}
                    >
                      {downloading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download for Windows
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tutorial card */}
              <Card className="card-lift relative overflow-hidden border-border/40 bg-card/70 backdrop-blur-md flex flex-col animate-scale-in delay-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-full blur-2xl pointer-events-none" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground icon-pop">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <Badge variant="outline">Guide</Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">How to install</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-3">
                  <ol className="space-y-2.5 text-sm">
                    <li className="flex gap-3 items-start">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                        1
                      </span>
                      <div className="flex items-start gap-1.5 flex-1 min-w-0">
                        <Download className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed text-left">
                          Download the <strong className="text-foreground">.zip</strong> file.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                        2
                      </span>
                      <div className="flex items-start gap-1.5 flex-1 min-w-0">
                        <FileArchive className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed text-left">
                          Open the <strong className="text-foreground">.zip</strong> archive.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                        3
                      </span>
                      <div className="flex items-start gap-1.5 flex-1 min-w-0">
                        <FolderOpen className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed text-left">
                          Drag the folder from the <strong className="text-foreground">.zip</strong> to a location of your choice.
                        </span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                        4
                      </span>
                      <div className="flex items-start gap-1.5 flex-1 min-w-0">
                        <MousePointerClick className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground leading-relaxed text-left">
                          Open the <strong className="text-foreground">.exe</strong> file inside the folder.
                        </span>
                      </div>
                    </li>
                  </ol>

                  {/* Warning box */}
                  <div className="mt-auto pt-2">
                    <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300">Warning:</strong> Do
                        not touch the other files. Modifying or removing them
                        may compromise the stability and proper operation of the
                        macro.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System requirements */}
            <div className="mt-8 sm:mt-10 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-5 sm:p-6 animate-fade-up">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                Minimum system requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• OS: Windows 10/11 (64-bit)</div>
                <div>• RAM: 2 GB minimum</div>
                <div>• Disk space: 10 MB free</div>
                <div>• CPU: x64 dual-core 1.6 GHz</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
