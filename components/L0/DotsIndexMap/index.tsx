import React from 'react'
import styles from './styles.module.scss'

const Component = ({
	className = '',
	children
}: {
	className?: string
	children: never | never[]
}) => {
	return (
		<div className={`dotsindexmap ${className} ${styles["dotsindexmap"]}`}>
			{children}
		</div>
	)
}

export default Component