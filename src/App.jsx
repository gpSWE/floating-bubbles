import React, { useState, useEffect } from "react"

const Bubble = ( { x, y, data, onClick, size } ) => {

	const style = {
		position: "absolute",
		left: `${ x }px`,
		top: `${ y }px`,
		width: `${ size }px`,
		height: `${ size }px`,
		borderRadius: "50%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		background: "white",
		color: "black",
		fontWeight: "bold",
		transform: "translate(-50%, -50%)",
		transition: "transform 0.2s ease",
	}

	return (
		<div onClick={ onClick } style={ style }>
			{ data }
		</div>
	)
}

const FloatingBubbles = () => {

	const [ bubbles, setBubbles ] = useState( [] )
	const containerRef = React.useRef( null )

	const containerStyle = {
		position: "relative",
		width: "100vw",
		height: "100vh",
		backgroundColor: "black",
		overflow: "hidden",
	}

	useEffect( () => {

		const initialBubbles = Array.from( { length: 5 }, ( _, i ) => ( {
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			dx: ( Math.random() - 0.5 ) * 3,
			dy: ( Math.random() - 0.5 ) * 3,
			data: Math.floor( Math.random() * 100 ),
			size: Math.random() * 30 + 50
		} ) )

		setBubbles( initialBubbles )

		const animate = () => {

			setBubbles( prevBubbles =>

				prevBubbles.map( bubble => {

					let newX = bubble.x + bubble.dx
					let newY = bubble.y + bubble.dy
					let newDx = bubble.dx
					let newDy = bubble.dy

					if ( newX < 0 || newX > window.innerWidth ) {

						newDx = - newDx
					}
					if ( newY < 0 || newY > window.innerHeight ) {

						newDy = - newDy
					}

					return {
						...bubble,
						x: newX,
						y: newY,
						dx: newDx,
						dy: newDy
					}
				} )
			)

			requestAnimationFrame( animate )
		}

		const animationId = requestAnimationFrame( animate )

		return () => cancelAnimationFrame( animationId )

	}, [] )

	return (
		<div ref={ containerRef } style={ containerStyle }>
			{ bubbles.map( bubble => (
				<Bubble
					key={ bubble.id }
					x={ bubble.x }
					y={ bubble.y }
					data={ bubble.data }
					size={ bubble.size }
					onClick={ () => alert( bubble.data ) }
				/>
			) ) }
		</div>
	)
}

export default FloatingBubbles
