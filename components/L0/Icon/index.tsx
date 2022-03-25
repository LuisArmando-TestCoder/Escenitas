import React from 'react'
import {
    Icons as IconsState
} from '../../../state'
import {
    usePromisedRecoilValue
} from '../../../utils'
import {
    RecoilState
} from 'recoil'

interface Properties {
    name: 'magnifying-glass' | 'back' | 'sleep-mode'
        | 'shopping-cart' | 'settings' | 'sunny-day'
    className?: string
}

type AnyObject = {[index: string]: any}

const Icon = ({
    name,
    className = ''
}: Properties) => {
    const icon = usePromisedRecoilValue(IconsState as RecoilState<AnyObject>, {
        transform: icons => (icons as AnyObject)[name]
    })

    return (
        <span
            className={`icon ${className}`}
            dangerouslySetInnerHTML={{__html: icon as any}}
        />
    )
}

const Component = (properties: Properties) => {
    return (
        <Icon {...properties}/>
    )
}

export default Component