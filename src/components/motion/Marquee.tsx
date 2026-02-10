"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
	items: string[];
	className?: string;
	itemClassName?: string;
	duration?: number;
	pauseOnHover?: boolean;
	direction?: "left" | "right";
};

export function Marquee({
	items,
	className,
	itemClassName,
	duration = 28,
	pauseOnHover = true,
	direction = "left",
}: MarqueeProps) {
	const loopedItems = [...items, ...items];

	if (items.length === 0) {
		return null;
	}

	return (
		<div
			className={cn("marquee", className)}
			style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
			data-direction={direction}
			data-pause={pauseOnHover ? "true" : "false"}
		>
			<div className="marquee__track">
				{loopedItems.map((item, index) => (
					<span key={`${item}-${index}`} className={cn("marquee__item", itemClassName)}>
						{item}
					</span>
				))}
			</div>
		</div>
	);
}
