'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  LayoutDashboard,
  Library,
  MessageCircle,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

const courses = [
  { title: 'Linear Algebra', meta: '8 lessons · 2h 15m', progress: 68, color: 'coral', icon: '∑' },
  { title: 'Organic Chemistry', meta: '12 lessons · 4h 40m', progress: 42, color: 'teal', icon: '⚗' },
  { title: 'World History', meta: '6 lessons · 1h 50m', progress: 25, color: 'gold', icon: '◈' },
]

const prompts = ['Explain eigenvectors simply', 'Quiz me on this topic', 'Create a study plan']

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [selectedCourse, setSelectedCourse] = useState(courses[0])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi Alex, I’m ready to help you learn. What are we exploring today?' },
  ])
  const [started, setStarted] = useState(false)

  const chart = useMemo(() => [38, 56, 43, 72, 61, 88, 67], [])

  function sendMessage(text = message) {
    const clean = text.trim()
    if (!clean) return
    setMessages((current) => [
      ...current,
      { role: 'user', text: clean },
      { role: 'assistant', text: `Let’s work through “${clean}” together. I’ll break it into a clear explanation, then give you a quick check for understanding.` },
    ])
    setMessage('')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-sidebar px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Sparkles className="size-4" /></div>
            <span className="font-serif text-xl font-semibold tracking-tight">morrow</span>
          </div>
          <nav className="flex flex-col gap-1">
            {[
              [LayoutDashboard, 'Overview'], [BookOpen, 'My courses'], [Brain, 'Practice'], [Library, 'Library'], [Users, 'Study groups'],
            ].map(([Icon, label]) => (
              <button key={label as string} onClick={() => setActiveNav(label as string)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${activeNav === label ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                <Icon className="size-4" />{label as string}
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-1">
            <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"><Settings className="size-4" />Settings</button>
            <div className="mt-5 flex items-center gap-3 border-t border-border/70 px-2 pt-5">
              <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">AC</div>
              <div><p className="text-sm font-semibold">Alex Chen</p><p className="text-xs text-muted-foreground">Learner · Level 12</p></div>
              <MoreHorizontal className="ml-auto size-4 text-muted-foreground" />
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-border/70 px-5 sm:px-8">
            <div><p className="text-sm text-muted-foreground">Tuesday, September 10</p><h1 className="font-serif text-2xl font-semibold tracking-tight">Good morning, Alex</h1></div>
            <div className="flex items-center gap-3"><button className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground sm:flex"><Search className="size-4" />Search <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">⌘ K</kbd></button><button className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold sm:hidden">AC</button><div className="hidden size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold sm:flex">AC</div></div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
            <div className="mb-8 grid gap-4 xl:grid-cols-[1fr_1fr_1fr]">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm"><div className="mb-8 flex items-start justify-between"><div><p className="text-sm text-primary-foreground/70">Daily streak</p><p className="mt-1 font-serif text-4xl font-semibold">12 days</p></div><div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"><Flame className="size-5" /></div></div><div className="flex items-center justify-between text-xs text-primary-foreground/70"><span>Keep it going</span><span>4 of 7 days</span></div><div className="mt-2 flex gap-1.5">{[1,1,1,1,0,0,0].map((done, i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${done ? 'bg-primary-foreground' : 'bg-primary-foreground/20'}`} />)}</div></div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="mb-7 flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Weekly progress</p><p className="mt-1 font-serif text-4xl font-semibold">7.4 <span className="font-sans text-base font-medium text-muted-foreground">hours</span></p></div><div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Clock3 className="size-5" /></div></div><div className="flex h-10 items-end gap-2">{chart.map((value, i) => <div key={i} className="flex flex-1 flex-col items-center gap-1"><div className={`w-full rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-accent'}`} style={{ height: `${value}%` }} /><span className="text-[10px] text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span></div>)}</div></div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="mb-7 flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Current goal</p><p className="mt-1 font-serif text-3xl font-semibold">3 / 5 lessons</p></div><div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Target className="size-5" /></div></div><div className="h-2 rounded-full bg-muted"><div className="h-2 w-3/5 rounded-full bg-primary" /></div><p className="mt-3 text-xs text-muted-foreground">2 lessons left to reach your weekly goal</p></div>
            </div>

            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="min-w-0"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-serif text-xl font-semibold">Continue learning</h2><p className="mt-1 text-sm text-muted-foreground">Pick up where you left off</p></div><button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">View all <ArrowRight className="size-4" /></button></div><div className="grid gap-4 md:grid-cols-3">{courses.map((course) => <button key={course.title} onClick={() => setSelectedCourse(course)} className={`group rounded-2xl border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${selectedCourse.title === course.title ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border'}`}><div className={`mb-5 flex size-11 items-center justify-center rounded-xl text-xl ${course.color === 'coral' ? 'bg-coral/15 text-coral' : course.color === 'teal' ? 'bg-teal/15 text-teal' : 'bg-gold/20 text-gold-foreground'}`}>{course.icon}</div><p className="font-semibold">{course.title}</p><p className="mt-1 text-xs text-muted-foreground">{course.meta}</p><div className="mt-5 flex items-center gap-2"><div className="h-1.5 flex-1 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${course.progress}%` }} /></div><span className="text-xs font-medium text-muted-foreground">{course.progress}%</span></div></button>)}</div>

                <div className="mb-4 mt-9 flex items-center justify-between"><div><h2 className="font-serif text-xl font-semibold">Up next</h2><p className="mt-1 text-sm text-muted-foreground">Small steps, steady progress</p></div><button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">See schedule <ArrowRight className="size-4" /></button></div><div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">{[['Vectors & spaces','Linear Algebra','12 min','Today'],['Reaction mechanisms','Organic Chemistry','18 min','Tomorrow'],['The Renaissance','World History','15 min','Friday']].map(([title, subject, time, day], i) => <div key={title} className="flex items-center gap-4 p-4 sm:p-5"><div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${i === 0 ? 'bg-coral/15 text-coral' : i === 1 ? 'bg-teal/15 text-teal' : 'bg-gold/20 text-gold-foreground'}`}><BookOpen className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-muted-foreground">{subject} · {time}</p></div><span className="hidden text-xs text-muted-foreground sm:block">{day}</span><button onClick={() => setStarted(true)} className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" aria-label={`Start ${title}`}><Play className="size-3.5 fill-current" /></button></div>)}</div></div>

              <aside className="flex min-w-0 flex-col gap-6"><div className="rounded-2xl border border-border bg-card shadow-sm"><div className="flex items-center justify-between border-b border-border p-5"><div><h2 className="font-serif text-xl font-semibold">Your AI tutor</h2><p className="mt-1 text-sm text-muted-foreground">Always here to help you learn</p></div><div className="relative flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Brain className="size-5" /><span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-card bg-teal" /></div></div><div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-5">{messages.map((item, i) => <div key={i} className={`flex gap-2 ${item.role === 'user' ? 'justify-end' : ''}`}>{item.role === 'assistant' && <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent"><Sparkles className="size-3 text-accent-foreground" /></div>}<div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${item.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{item.text}</div></div>)}</div><div className="border-t border-border p-3"><div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">{prompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)} className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-accent">{prompt}</button>)}</div><div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) sendMessage() }} placeholder="Ask anything..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" aria-label="Ask your AI tutor" /><button onClick={() => sendMessage()} className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground" aria-label="Send message"><Send className="size-3.5" /></button></div></div></div><div className="rounded-2xl bg-accent p-5"><div className="flex items-start gap-3"><div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-accent-foreground"><Trophy className="size-4" /></div><div><p className="text-sm font-semibold">You’re on a roll</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Complete one more session today to unlock your next achievement.</p></div></div><button onClick={() => setStarted(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-background py-2 text-xs font-semibold shadow-sm hover:bg-card">Start a session <ArrowRight className="size-3.5" /></button></div></aside>
            </div>
            {started && <div className="fixed bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg"><div className="flex size-5 items-center justify-center rounded-full bg-primary-foreground text-primary"><Check className="size-3" /></div>Session added to your study plan<button onClick={() => setStarted(false)} className="ml-2 opacity-70 hover:opacity-100" aria-label="Dismiss notification">×</button></div>}
          </div>
        </section>
      </div>
    </main>
  )
}
