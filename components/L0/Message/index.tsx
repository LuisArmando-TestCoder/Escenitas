import React from 'react'
import styles from './styles.module.scss'

const Component = ({
	className = '',
	text = ''
}) => {
	return (
		<div className={`message ${className} ${styles["message"]}`}>
			{text}
		</div>
	)
}

export default Component