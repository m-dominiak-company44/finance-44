import { Fragment, useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUp, CalendarClock, ChevronDown, Info, ScrollText } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { CONTACT_URL, formatLegalDate } from '~/lib/legal';
import { cn } from '~/lib/utils';

/** One piece of a section: a paragraph, a bullet list or a highlighted note. */
export type LegalBlock = { p: string } | { list: string[] } | { note: string };

export interface LegalSection {
    id: string;
    title: string;
    content: LegalBlock[];
}

export interface LegalHighlight {
    title: string;
    text: string;
}

type Icon = ComponentType<{ className?: string }>;

interface LegalPageProps {
    title: string;
    subtitle: string;
    /** YYYY-MM-DD from `~/lib/legal`. */
    updated: string;
    highlights: LegalHighlight[];
    /** Icons of [highlights], in the same order. */
    highlightIcons: Icon[];
    sections: LegalSection[];
    related: { page: 'privacy' | 'terms'; title: string; description: string };
}

/** Shared layout of the privacy policy and the terms of use: hero, key points, table of contents, numbered sections. */
export function LegalPage({ title, subtitle, updated, highlights, highlightIcons, sections, related }: LegalPageProps) {
    const { t, i18n } = useTranslation();
    const active = useActiveSection(sections.map((s) => s.id));

    useEffect(() => {
        document.title = `${title} · Finance 44`;
        return () => {
            document.title = 'Finance 44';
        };
    }, [title]);

    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    return (
        <div className="pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/10 via-background to-background">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-4 py-16 text-center md:py-20">
                    <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
                        <ScrollText className="size-4 text-primary" />
                        {t('legal.kicker')}
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
                    <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarClock className="size-4" />
                        <span>
                            {t('legal.updated')}{' '}
                            <time dateTime={updated} className="font-medium text-foreground">
                                {formatLegalDate(updated, i18n.resolvedLanguage ?? i18n.language)}
                            </time>
                        </span>
                    </p>
                </div>
            </section>

            <div className="mx-auto w-full max-w-6xl px-4">
                {/* Key points */}
                <section aria-label={t('legal.summary')} className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((item, index) => {
                        const ItemIcon = highlightIcons[index] ?? Info;
                        return (
                            <div key={item.title} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm sm:block">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-4">
                                    <ItemIcon className="size-5" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
                    {/* Table of contents: sticky list on large screens, collapsible on small ones */}
                    <aside className="mb-6 lg:mb-0">
                        <nav aria-label={t('legal.toc')} className="hidden lg:sticky lg:top-24 lg:block">
                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {t('legal.toc')}
                            </p>
                            <TocList sections={sections} active={active} onSelect={scrollTo} />
                        </nav>
                        <Collapsible className="rounded-2xl border bg-card lg:hidden">
                            <CollapsibleTrigger className="group flex w-full items-center justify-between px-5 py-4 text-left font-medium">
                                {t('legal.toc')}
                                <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-2 pb-3">
                                <TocList sections={sections} active={active} onSelect={scrollTo} />
                            </CollapsibleContent>
                        </Collapsible>
                    </aside>

                    <div className="space-y-6">
                        <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                            {sections.map((section, index) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24 border-t px-6 py-8 first:border-t-0 md:px-10"
                                >
                                    <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                                            {index + 1}
                                        </span>
                                        {section.title}
                                    </h2>
                                    <div className="mt-4 space-y-4 leading-relaxed text-foreground/85">
                                        {section.content.map((block, blockIndex) => (
                                            <Block key={blockIndex} block={block} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </article>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                            <Link
                                to={`?page=${related.page}`}
                                className="group flex flex-1 items-center justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                            >
                                <span>
                                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {t('legal.related')}
                                    </span>
                                    <span className="mt-1 block font-semibold">{related.title}</span>
                                    <span className="mt-1 block text-sm text-muted-foreground">{related.description}</span>
                                </span>
                                <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                            </Link>
                            <button
                                type="button"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center justify-center gap-2 rounded-2xl border bg-card px-5 py-4 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
                            >
                                <ArrowUp className="size-4" />
                                {t('legal.backToTop')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TocList({ sections, active, onSelect }: { sections: LegalSection[]; active: string | null; onSelect: (id: string) => void }) {
    return (
        <ol className="space-y-0.5">
            {sections.map((section, index) => (
                <li key={section.id}>
                    <button
                        type="button"
                        onClick={() => onSelect(section.id)}
                        aria-current={active === section.id ? 'location' : undefined}
                        className={cn(
                            'flex w-full gap-3 rounded-lg px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-foreground',
                            active === section.id ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground',
                        )}
                    >
                        <span className="w-4 shrink-0 tabular-nums">{index + 1}.</span>
                        <span>{section.title}</span>
                    </button>
                </li>
            ))}
        </ol>
    );
}

function Block({ block }: { block: LegalBlock }) {
    if ('list' in block) {
        return (
            <ul className="space-y-2">
                {block.list.map((item, index) => (
                    <li key={index} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>
                            <RichText text={item} />
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
    if ('note' in block) {
        return (
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-foreground">
                <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                <p>
                    <RichText text={block.note} />
                </p>
            </div>
        );
    }
    return (
        <p>
            <RichText text={block.p} />
        </p>
    );
}

/** Internal link targets usable in the texts as `[label](privacy)`, `[label](terms)`, `[label](contact)`. */
const INTERNAL_LINKS: Record<string, string> = { privacy: '?page=privacy', terms: '?page=terms' };

/** Renders `**bold**` and `[label](url)` inside translated texts. */
function RichText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return (
        <>
            {parts.map((part, index) => {
                const bold = /^\*\*([^*]+)\*\*$/.exec(part);
                if (bold)
                    return (
                        <strong key={index} className="font-semibold text-foreground">
                            {bold[1]}
                        </strong>
                    );
                const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
                if (link) return <TextLink key={index} label={link[1]} target={link[2]} />;
                return <Fragment key={index}>{part}</Fragment>;
            })}
        </>
    );
}

function TextLink({ label, target }: { label: string; target: string }): ReactNode {
    const className = 'font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary';
    const internal = INTERNAL_LINKS[target];
    if (internal) {
        return (
            <Link to={internal} className={className}>
                {label}
            </Link>
        );
    }
    const href = target === 'contact' ? CONTACT_URL : target;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
        </a>
    );
}

/** Id of the section at the top of the viewport, for highlighting it in the table of contents. */
function useActiveSection(ids: string[]): string | null {
    const [active, setActive] = useState<string | null>(ids[0] ?? null);
    const key = ids.join('|');

    useEffect(() => {
        const elements = key
            .split('|')
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (elements.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) setActive(visible[0].target.id);
            },
            // A section counts as current while it crosses the upper part of the screen.
            { rootMargin: '-96px 0px -60% 0px' },
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [key]);

    return active;
}
