import React from 'react'
import {Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link"

interface Props {
    href:String;
    children:String
}

const Link = ({href, children}:Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link