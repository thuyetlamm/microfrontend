"use client"

import { ReactNode, MouseEvent as MouseEventReact } from "react"
import { sleep } from "@repo/utils/sleep.ts";
import Link, {LinkProps} from "next/link";
import {useRouter} from "next/navigation";

interface LinkTransitionProps extends Omit<LinkProps, "href"> {
    href: string
    children: ReactNode
    className? : string
}
const LinkTransition = ({ href, children, className,...rest }: LinkTransitionProps) => {
    const { push } = useRouter()

    const handleNav = async (
        e: MouseEventReact<HTMLAnchorElement, MouseEvent>,
    ) => {
        e.preventDefault()
        const body = document.querySelector("body")
        if (!body) {
            push(href)
            return
        }
        body.classList.add("page_entered_active")
        await sleep(400)
        push(href)
        await sleep(400)
        body.classList.remove("page_entered_active")
    }
    return (
        <Link className={className} onClick={handleNav} href={href} {...rest}>
            {children}
        </Link>
    )
}

export default LinkTransition
