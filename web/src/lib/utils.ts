import {type ClassValue, clsx} from "clsx"

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export function formatCurrency(amount: number, currency: string = "LAK"): string {
    return new Intl.NumberFormat("lo-LA", {
        style: "currency",
        currency: currency,
    }).format(amount)
}

export function formatDate(date: Date | string, locale: string = "en-US"): string {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj)
}

export function formatTime(date: Date | string, locale: string = "en-US"): string {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(dateObj)
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-")
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length) + "..."
}
