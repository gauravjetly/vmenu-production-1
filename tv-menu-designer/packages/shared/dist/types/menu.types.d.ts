import { z } from 'zod';
export declare const BaseElementSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["section", "text", "image", "video", "menuItem", "shape", "widget"]>;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "section" | "text" | "image" | "video" | "menuItem" | "shape" | "widget";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "section" | "text" | "image" | "video" | "menuItem" | "shape" | "widget";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const TextElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"text">;
    content: z.ZodString;
    style: z.ZodObject<{
        fontFamily: z.ZodString;
        fontSize: z.ZodNumber;
        fontWeight: z.ZodOptional<z.ZodString>;
        fontStyle: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        color: z.ZodString;
        lineHeight: z.ZodOptional<z.ZodNumber>;
        letterSpacing: z.ZodOptional<z.ZodNumber>;
        textDecoration: z.ZodOptional<z.ZodString>;
        textShadow: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            blur: z.ZodNumber;
            color: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }, {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "text";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    content: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "text";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    content: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const ImageElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        objectFit: z.ZodOptional<z.ZodEnum<["contain", "cover", "fill", "none", "scale-down"]>>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        filter: z.ZodOptional<z.ZodObject<{
            brightness: z.ZodOptional<z.ZodNumber>;
            contrast: z.ZodOptional<z.ZodNumber>;
            grayscale: z.ZodOptional<z.ZodNumber>;
            blur: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        }, {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    }, {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "image";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    src: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    style?: {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    } | undefined;
    alt?: string | undefined;
}, {
    id: string;
    type: "image";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    src: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    style?: {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    } | undefined;
    alt?: string | undefined;
}>;
export declare const VideoElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"video">;
    src: z.ZodString;
    poster: z.ZodOptional<z.ZodString>;
    settings: z.ZodObject<{
        autoplay: z.ZodDefault<z.ZodBoolean>;
        loop: z.ZodDefault<z.ZodBoolean>;
        muted: z.ZodDefault<z.ZodBoolean>;
        controls: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        loop: boolean;
        autoplay: boolean;
        muted: boolean;
        controls: boolean;
    }, {
        loop?: boolean | undefined;
        autoplay?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "video";
    settings: {
        loop: boolean;
        autoplay: boolean;
        muted: boolean;
        controls: boolean;
    };
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    src: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    poster?: string | undefined;
}, {
    id: string;
    type: "video";
    settings: {
        loop?: boolean | undefined;
        autoplay?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
    };
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    src: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    poster?: string | undefined;
}>;
export declare const MenuItemElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"menuItem">;
    data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        dietary: z.ZodDefault<z.ZodArray<z.ZodEnum<["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"]>, "many">>;
        spiceLevel: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        tags: string[];
        price: string;
        dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
        description?: string | undefined;
        image?: string | undefined;
        spiceLevel?: number | undefined;
    }, {
        name: string;
        price: string;
        description?: string | undefined;
        tags?: string[] | undefined;
        image?: string | undefined;
        dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
        spiceLevel?: number | undefined;
    }>;
    layout: z.ZodDefault<z.ZodEnum<["horizontal", "vertical", "card", "list"]>>;
    style: z.ZodObject<{
        nameStyle: z.ZodAny;
        descriptionStyle: z.ZodOptional<z.ZodAny>;
        priceStyle: z.ZodAny;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        padding: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    }, {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "menuItem";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    };
    data: {
        name: string;
        tags: string[];
        price: string;
        dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
        description?: string | undefined;
        image?: string | undefined;
        spiceLevel?: number | undefined;
    };
    layout: "horizontal" | "vertical" | "card" | "list";
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "menuItem";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    };
    data: {
        name: string;
        price: string;
        description?: string | undefined;
        tags?: string[] | undefined;
        image?: string | undefined;
        dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
        spiceLevel?: number | undefined;
    };
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
}>;
export declare const ShapeElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"shape">;
    shapeType: z.ZodEnum<["rectangle", "circle", "triangle", "line", "polygon", "star"]>;
    style: z.ZodObject<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    }, {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "shape";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    };
    shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "shape";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    };
    shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const SectionElementSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"section">;
    style: z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundImage: z.ZodOptional<z.ZodString>;
        backgroundSize: z.ZodOptional<z.ZodString>;
        backgroundPosition: z.ZodOptional<z.ZodString>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderColor: z.ZodOptional<z.ZodString>;
        shadow: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            blur: z.ZodNumber;
            color: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }, {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }>;
    children: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "section";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    children: string[];
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "section";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    children: string[];
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const ElementSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"section">;
    style: z.ZodObject<{
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundImage: z.ZodOptional<z.ZodString>;
        backgroundSize: z.ZodOptional<z.ZodString>;
        backgroundPosition: z.ZodOptional<z.ZodString>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        borderWidth: z.ZodOptional<z.ZodNumber>;
        borderColor: z.ZodOptional<z.ZodString>;
        shadow: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            blur: z.ZodNumber;
            color: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }, {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }>;
    children: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "section";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    children: string[];
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "section";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        backgroundColor?: string | undefined;
        backgroundImage?: string | undefined;
        backgroundSize?: string | undefined;
        backgroundPosition?: string | undefined;
        borderRadius?: number | undefined;
        borderWidth?: number | undefined;
        borderColor?: string | undefined;
        shadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    children: string[];
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"text">;
    content: z.ZodString;
    style: z.ZodObject<{
        fontFamily: z.ZodString;
        fontSize: z.ZodNumber;
        fontWeight: z.ZodOptional<z.ZodString>;
        fontStyle: z.ZodOptional<z.ZodString>;
        textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
        color: z.ZodString;
        lineHeight: z.ZodOptional<z.ZodNumber>;
        letterSpacing: z.ZodOptional<z.ZodNumber>;
        textDecoration: z.ZodOptional<z.ZodString>;
        textShadow: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
            blur: z.ZodNumber;
            color: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }, {
            x: number;
            y: number;
            blur: number;
            color: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }, {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "text";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    content: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "text";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        color: string;
        fontFamily: string;
        fontSize: number;
        fontWeight?: string | undefined;
        fontStyle?: string | undefined;
        textAlign?: "left" | "center" | "right" | "justify" | undefined;
        lineHeight?: number | undefined;
        letterSpacing?: number | undefined;
        textDecoration?: string | undefined;
        textShadow?: {
            x: number;
            y: number;
            blur: number;
            color: string;
        } | undefined;
    };
    content: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"image">;
    src: z.ZodString;
    alt: z.ZodOptional<z.ZodString>;
    style: z.ZodOptional<z.ZodObject<{
        objectFit: z.ZodOptional<z.ZodEnum<["contain", "cover", "fill", "none", "scale-down"]>>;
        borderRadius: z.ZodOptional<z.ZodNumber>;
        filter: z.ZodOptional<z.ZodObject<{
            brightness: z.ZodOptional<z.ZodNumber>;
            contrast: z.ZodOptional<z.ZodNumber>;
            grayscale: z.ZodOptional<z.ZodNumber>;
            blur: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        }, {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    }, {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "image";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    src: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    style?: {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    } | undefined;
    alt?: string | undefined;
}, {
    id: string;
    type: "image";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    src: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    style?: {
        filter?: {
            blur?: number | undefined;
            brightness?: number | undefined;
            contrast?: number | undefined;
            grayscale?: number | undefined;
        } | undefined;
        borderRadius?: number | undefined;
        objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
    } | undefined;
    alt?: string | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"video">;
    src: z.ZodString;
    poster: z.ZodOptional<z.ZodString>;
    settings: z.ZodObject<{
        autoplay: z.ZodDefault<z.ZodBoolean>;
        loop: z.ZodDefault<z.ZodBoolean>;
        muted: z.ZodDefault<z.ZodBoolean>;
        controls: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        loop: boolean;
        autoplay: boolean;
        muted: boolean;
        controls: boolean;
    }, {
        loop?: boolean | undefined;
        autoplay?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "video";
    settings: {
        loop: boolean;
        autoplay: boolean;
        muted: boolean;
        controls: boolean;
    };
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    src: string;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    poster?: string | undefined;
}, {
    id: string;
    type: "video";
    settings: {
        loop?: boolean | undefined;
        autoplay?: boolean | undefined;
        muted?: boolean | undefined;
        controls?: boolean | undefined;
    };
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    src: string;
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    poster?: string | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"menuItem">;
    data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        price: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        dietary: z.ZodDefault<z.ZodArray<z.ZodEnum<["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"]>, "many">>;
        spiceLevel: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        tags: string[];
        price: string;
        dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
        description?: string | undefined;
        image?: string | undefined;
        spiceLevel?: number | undefined;
    }, {
        name: string;
        price: string;
        description?: string | undefined;
        tags?: string[] | undefined;
        image?: string | undefined;
        dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
        spiceLevel?: number | undefined;
    }>;
    layout: z.ZodDefault<z.ZodEnum<["horizontal", "vertical", "card", "list"]>>;
    style: z.ZodObject<{
        nameStyle: z.ZodAny;
        descriptionStyle: z.ZodOptional<z.ZodAny>;
        priceStyle: z.ZodAny;
        backgroundColor: z.ZodOptional<z.ZodString>;
        borderColor: z.ZodOptional<z.ZodString>;
        padding: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    }, {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "menuItem";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    };
    data: {
        name: string;
        tags: string[];
        price: string;
        dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
        description?: string | undefined;
        image?: string | undefined;
        spiceLevel?: number | undefined;
    };
    layout: "horizontal" | "vertical" | "card" | "list";
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "menuItem";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        backgroundColor?: string | undefined;
        borderColor?: string | undefined;
        nameStyle?: any;
        descriptionStyle?: any;
        priceStyle?: any;
        padding?: number | undefined;
    };
    data: {
        name: string;
        price: string;
        description?: string | undefined;
        tags?: string[] | undefined;
        image?: string | undefined;
        dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
        spiceLevel?: number | undefined;
    };
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
}>, z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodNumber;
    locked: z.ZodDefault<z.ZodBoolean>;
    visible: z.ZodDefault<z.ZodBoolean>;
    position: z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>;
    size: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
    }, {
        width: number;
        height: number;
    }>;
    rotation: z.ZodDefault<z.ZodNumber>;
    opacity: z.ZodDefault<z.ZodNumber>;
    animation: z.ZodOptional<z.ZodObject<{
        enter: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        }>>;
        loop: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            repeat: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }, {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
} & {
    type: z.ZodLiteral<"shape">;
    shapeType: z.ZodEnum<["rectangle", "circle", "triangle", "line", "polygon", "star"]>;
    style: z.ZodObject<{
        fill: z.ZodOptional<z.ZodString>;
        stroke: z.ZodOptional<z.ZodString>;
        strokeWidth: z.ZodOptional<z.ZodNumber>;
        strokeDasharray: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    }, {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "shape";
    layer: number;
    locked: boolean;
    visible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation: number;
    opacity: number;
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    };
    shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    id: string;
    type: "shape";
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    style: {
        fill?: string | undefined;
        stroke?: string | undefined;
        strokeWidth?: number | undefined;
        strokeDasharray?: string | undefined;
    };
    shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            easing?: string | undefined;
            delay?: number | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
}>]>;
export declare const PageSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    duration: z.ZodOptional<z.ZodNumber>;
    transition: z.ZodOptional<z.ZodObject<{
        type: z.ZodString;
        duration: z.ZodNumber;
        easing: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        duration: number;
        easing: string;
    }, {
        type: string;
        duration: number;
        easing: string;
    }>>;
    elements: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"section">;
        style: z.ZodObject<{
            backgroundColor: z.ZodOptional<z.ZodString>;
            backgroundImage: z.ZodOptional<z.ZodString>;
            backgroundSize: z.ZodOptional<z.ZodString>;
            backgroundPosition: z.ZodOptional<z.ZodString>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            borderWidth: z.ZodOptional<z.ZodNumber>;
            borderColor: z.ZodOptional<z.ZodString>;
            shadow: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
                blur: z.ZodNumber;
                color: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                blur: number;
                color: string;
            }, {
                x: number;
                y: number;
                blur: number;
                color: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        }, {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        }>;
        children: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "section";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        children: string[];
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        type: "section";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        children: string[];
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"text">;
        content: z.ZodString;
        style: z.ZodObject<{
            fontFamily: z.ZodString;
            fontSize: z.ZodNumber;
            fontWeight: z.ZodOptional<z.ZodString>;
            fontStyle: z.ZodOptional<z.ZodString>;
            textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
            color: z.ZodString;
            lineHeight: z.ZodOptional<z.ZodNumber>;
            letterSpacing: z.ZodOptional<z.ZodNumber>;
            textDecoration: z.ZodOptional<z.ZodString>;
            textShadow: z.ZodOptional<z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
                blur: z.ZodNumber;
                color: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
                blur: number;
                color: string;
            }, {
                x: number;
                y: number;
                blur: number;
                color: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        }, {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "text";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        content: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        type: "text";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        content: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"image">;
        src: z.ZodString;
        alt: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodObject<{
            objectFit: z.ZodOptional<z.ZodEnum<["contain", "cover", "fill", "none", "scale-down"]>>;
            borderRadius: z.ZodOptional<z.ZodNumber>;
            filter: z.ZodOptional<z.ZodObject<{
                brightness: z.ZodOptional<z.ZodNumber>;
                contrast: z.ZodOptional<z.ZodNumber>;
                grayscale: z.ZodOptional<z.ZodNumber>;
                blur: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            }, {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        }, {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "image";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        src: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        style?: {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        } | undefined;
        alt?: string | undefined;
    }, {
        id: string;
        type: "image";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        src: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        style?: {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        } | undefined;
        alt?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"video">;
        src: z.ZodString;
        poster: z.ZodOptional<z.ZodString>;
        settings: z.ZodObject<{
            autoplay: z.ZodDefault<z.ZodBoolean>;
            loop: z.ZodDefault<z.ZodBoolean>;
            muted: z.ZodDefault<z.ZodBoolean>;
            controls: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            loop: boolean;
            autoplay: boolean;
            muted: boolean;
            controls: boolean;
        }, {
            loop?: boolean | undefined;
            autoplay?: boolean | undefined;
            muted?: boolean | undefined;
            controls?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "video";
        settings: {
            loop: boolean;
            autoplay: boolean;
            muted: boolean;
            controls: boolean;
        };
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        src: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        poster?: string | undefined;
    }, {
        id: string;
        type: "video";
        settings: {
            loop?: boolean | undefined;
            autoplay?: boolean | undefined;
            muted?: boolean | undefined;
            controls?: boolean | undefined;
        };
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        src: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        poster?: string | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"menuItem">;
        data: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodString;
            image: z.ZodOptional<z.ZodString>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            dietary: z.ZodDefault<z.ZodArray<z.ZodEnum<["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"]>, "many">>;
            spiceLevel: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            tags: string[];
            price: string;
            dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
            description?: string | undefined;
            image?: string | undefined;
            spiceLevel?: number | undefined;
        }, {
            name: string;
            price: string;
            description?: string | undefined;
            tags?: string[] | undefined;
            image?: string | undefined;
            dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
            spiceLevel?: number | undefined;
        }>;
        layout: z.ZodDefault<z.ZodEnum<["horizontal", "vertical", "card", "list"]>>;
        style: z.ZodObject<{
            nameStyle: z.ZodAny;
            descriptionStyle: z.ZodOptional<z.ZodAny>;
            priceStyle: z.ZodAny;
            backgroundColor: z.ZodOptional<z.ZodString>;
            borderColor: z.ZodOptional<z.ZodString>;
            padding: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        }, {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "menuItem";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        };
        data: {
            name: string;
            tags: string[];
            price: string;
            dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
            description?: string | undefined;
            image?: string | undefined;
            spiceLevel?: number | undefined;
        };
        layout: "horizontal" | "vertical" | "card" | "list";
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        type: "menuItem";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        };
        data: {
            name: string;
            price: string;
            description?: string | undefined;
            tags?: string[] | undefined;
            image?: string | undefined;
            dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
            spiceLevel?: number | undefined;
        };
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
    }>, z.ZodObject<{
        id: z.ZodString;
        layer: z.ZodNumber;
        locked: z.ZodDefault<z.ZodBoolean>;
        visible: z.ZodDefault<z.ZodBoolean>;
        position: z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>;
        size: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
        }, {
            width: number;
            height: number;
        }>;
        rotation: z.ZodDefault<z.ZodNumber>;
        opacity: z.ZodDefault<z.ZodNumber>;
        animation: z.ZodOptional<z.ZodObject<{
            enter: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            exit: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                delay: z.ZodOptional<z.ZodNumber>;
                easing: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            }>>;
            loop: z.ZodOptional<z.ZodObject<{
                type: z.ZodOptional<z.ZodString>;
                duration: z.ZodOptional<z.ZodNumber>;
                repeat: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }, {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }, {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        }>>;
    } & {
        type: z.ZodLiteral<"shape">;
        shapeType: z.ZodEnum<["rectangle", "circle", "triangle", "line", "polygon", "star"]>;
        style: z.ZodObject<{
            fill: z.ZodOptional<z.ZodString>;
            stroke: z.ZodOptional<z.ZodString>;
            strokeWidth: z.ZodOptional<z.ZodNumber>;
            strokeDasharray: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        }, {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "shape";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        };
        shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }, {
        id: string;
        type: "shape";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        };
        shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    elements: ({
        id: string;
        type: "section";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        children: string[];
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
        type: "text";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        content: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
        type: "image";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        src: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        style?: {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        } | undefined;
        alt?: string | undefined;
    } | {
        id: string;
        type: "video";
        settings: {
            loop: boolean;
            autoplay: boolean;
            muted: boolean;
            controls: boolean;
        };
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        src: string;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        poster?: string | undefined;
    } | {
        id: string;
        type: "menuItem";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        };
        data: {
            name: string;
            tags: string[];
            price: string;
            dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
            description?: string | undefined;
            image?: string | undefined;
            spiceLevel?: number | undefined;
        };
        layout: "horizontal" | "vertical" | "card" | "list";
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
        type: "shape";
        layer: number;
        locked: boolean;
        visible: boolean;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        rotation: number;
        opacity: number;
        style: {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        };
        shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    })[];
    duration?: number | undefined;
    transition?: {
        type: string;
        duration: number;
        easing: string;
    } | undefined;
}, {
    id: string;
    name: string;
    elements: ({
        id: string;
        type: "section";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            backgroundSize?: string | undefined;
            backgroundPosition?: string | undefined;
            borderRadius?: number | undefined;
            borderWidth?: number | undefined;
            borderColor?: string | undefined;
            shadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        children: string[];
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
        type: "text";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            color: string;
            fontFamily: string;
            fontSize: number;
            fontWeight?: string | undefined;
            fontStyle?: string | undefined;
            textAlign?: "left" | "center" | "right" | "justify" | undefined;
            lineHeight?: number | undefined;
            letterSpacing?: number | undefined;
            textDecoration?: string | undefined;
            textShadow?: {
                x: number;
                y: number;
                blur: number;
                color: string;
            } | undefined;
        };
        content: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
        type: "image";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        src: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        style?: {
            filter?: {
                blur?: number | undefined;
                brightness?: number | undefined;
                contrast?: number | undefined;
                grayscale?: number | undefined;
            } | undefined;
            borderRadius?: number | undefined;
            objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
        } | undefined;
        alt?: string | undefined;
    } | {
        id: string;
        type: "video";
        settings: {
            loop?: boolean | undefined;
            autoplay?: boolean | undefined;
            muted?: boolean | undefined;
            controls?: boolean | undefined;
        };
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        src: string;
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        poster?: string | undefined;
    } | {
        id: string;
        type: "menuItem";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            backgroundColor?: string | undefined;
            borderColor?: string | undefined;
            nameStyle?: any;
            descriptionStyle?: any;
            priceStyle?: any;
            padding?: number | undefined;
        };
        data: {
            name: string;
            price: string;
            description?: string | undefined;
            tags?: string[] | undefined;
            image?: string | undefined;
            dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
            spiceLevel?: number | undefined;
        };
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
        layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
    } | {
        id: string;
        type: "shape";
        layer: number;
        position: {
            x: number;
            y: number;
        };
        size: {
            width: number;
            height: number;
        };
        style: {
            fill?: string | undefined;
            stroke?: string | undefined;
            strokeWidth?: number | undefined;
            strokeDasharray?: string | undefined;
        };
        shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
        locked?: boolean | undefined;
        visible?: boolean | undefined;
        rotation?: number | undefined;
        opacity?: number | undefined;
        animation?: {
            enter?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            exit?: {
                type?: string | undefined;
                duration?: number | undefined;
                easing?: string | undefined;
                delay?: number | undefined;
            } | undefined;
            loop?: {
                type?: string | undefined;
                duration?: number | undefined;
                repeat?: number | undefined;
            } | undefined;
        } | undefined;
    })[];
    duration?: number | undefined;
    transition?: {
        type: string;
        duration: number;
        easing: string;
    } | undefined;
}>;
export declare const MenuTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    metadata: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        organization: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        category: z.ZodOptional<z.ZodEnum<["restaurant", "cafe", "bar", "retail", "healthcare", "education", "corporate"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        createdAt: string;
        updatedAt: string;
        tags: string[];
        description?: string | undefined;
        author?: string | undefined;
        organization?: string | undefined;
        category?: "restaurant" | "cafe" | "bar" | "retail" | "healthcare" | "education" | "corporate" | undefined;
    }, {
        name: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        author?: string | undefined;
        organization?: string | undefined;
        tags?: string[] | undefined;
        category?: "restaurant" | "cafe" | "bar" | "retail" | "healthcare" | "education" | "corporate" | undefined;
    }>;
    settings: z.ZodObject<{
        canvas: z.ZodObject<{
            width: z.ZodDefault<z.ZodNumber>;
            height: z.ZodDefault<z.ZodNumber>;
            backgroundColor: z.ZodOptional<z.ZodString>;
            backgroundImage: z.ZodOptional<z.ZodString>;
            aspectRatio: z.ZodDefault<z.ZodEnum<["16:9", "9:16", "1:1", "4:3", "3:4", "custom"]>>;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
            aspectRatio: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
        }, {
            width?: number | undefined;
            height?: number | undefined;
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            aspectRatio?: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4" | undefined;
        }>;
        theme: z.ZodOptional<z.ZodObject<{
            primaryColor: z.ZodString;
            secondaryColor: z.ZodOptional<z.ZodString>;
            accentColor: z.ZodOptional<z.ZodString>;
            textColor: z.ZodOptional<z.ZodString>;
            fonts: z.ZodOptional<z.ZodObject<{
                heading: z.ZodOptional<z.ZodString>;
                body: z.ZodOptional<z.ZodString>;
                price: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            }, {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        }, {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        }>>;
        animations: z.ZodOptional<z.ZodObject<{
            pageTransition: z.ZodDefault<z.ZodEnum<["none", "fade", "slide", "zoom", "flip", "cube"]>>;
            elementAnimation: z.ZodDefault<z.ZodBoolean>;
            autoPlayDuration: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            pageTransition: "none" | "fade" | "slide" | "zoom" | "flip" | "cube";
            elementAnimation: boolean;
            autoPlayDuration?: number | undefined;
        }, {
            pageTransition?: "none" | "fade" | "slide" | "zoom" | "flip" | "cube" | undefined;
            elementAnimation?: boolean | undefined;
            autoPlayDuration?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        canvas: {
            width: number;
            height: number;
            aspectRatio: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
        };
        theme?: {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        } | undefined;
        animations?: {
            pageTransition: "none" | "fade" | "slide" | "zoom" | "flip" | "cube";
            elementAnimation: boolean;
            autoPlayDuration?: number | undefined;
        } | undefined;
    }, {
        canvas: {
            width?: number | undefined;
            height?: number | undefined;
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            aspectRatio?: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4" | undefined;
        };
        theme?: {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        } | undefined;
        animations?: {
            pageTransition?: "none" | "fade" | "slide" | "zoom" | "flip" | "cube" | undefined;
            elementAnimation?: boolean | undefined;
            autoPlayDuration?: number | undefined;
        } | undefined;
    }>;
    pages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        duration: z.ZodOptional<z.ZodNumber>;
        transition: z.ZodOptional<z.ZodObject<{
            type: z.ZodString;
            duration: z.ZodNumber;
            easing: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            duration: number;
            easing: string;
        }, {
            type: string;
            duration: number;
            easing: string;
        }>>;
        elements: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"section">;
            style: z.ZodObject<{
                backgroundColor: z.ZodOptional<z.ZodString>;
                backgroundImage: z.ZodOptional<z.ZodString>;
                backgroundSize: z.ZodOptional<z.ZodString>;
                backgroundPosition: z.ZodOptional<z.ZodString>;
                borderRadius: z.ZodOptional<z.ZodNumber>;
                borderWidth: z.ZodOptional<z.ZodNumber>;
                borderColor: z.ZodOptional<z.ZodString>;
                shadow: z.ZodOptional<z.ZodObject<{
                    x: z.ZodNumber;
                    y: z.ZodNumber;
                    blur: z.ZodNumber;
                    color: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                }, {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            }, {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            }>;
            children: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "section";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }, {
            id: string;
            type: "section";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"text">;
            content: z.ZodString;
            style: z.ZodObject<{
                fontFamily: z.ZodString;
                fontSize: z.ZodNumber;
                fontWeight: z.ZodOptional<z.ZodString>;
                fontStyle: z.ZodOptional<z.ZodString>;
                textAlign: z.ZodOptional<z.ZodEnum<["left", "center", "right", "justify"]>>;
                color: z.ZodString;
                lineHeight: z.ZodOptional<z.ZodNumber>;
                letterSpacing: z.ZodOptional<z.ZodNumber>;
                textDecoration: z.ZodOptional<z.ZodString>;
                textShadow: z.ZodOptional<z.ZodObject<{
                    x: z.ZodNumber;
                    y: z.ZodNumber;
                    blur: z.ZodNumber;
                    color: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                }, {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                }>>;
            }, "strip", z.ZodTypeAny, {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            }, {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "text";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }, {
            id: string;
            type: "text";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"image">;
            src: z.ZodString;
            alt: z.ZodOptional<z.ZodString>;
            style: z.ZodOptional<z.ZodObject<{
                objectFit: z.ZodOptional<z.ZodEnum<["contain", "cover", "fill", "none", "scale-down"]>>;
                borderRadius: z.ZodOptional<z.ZodNumber>;
                filter: z.ZodOptional<z.ZodObject<{
                    brightness: z.ZodOptional<z.ZodNumber>;
                    contrast: z.ZodOptional<z.ZodNumber>;
                    grayscale: z.ZodOptional<z.ZodNumber>;
                    blur: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                }, {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            }, {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "image";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        }, {
            id: string;
            type: "image";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"video">;
            src: z.ZodString;
            poster: z.ZodOptional<z.ZodString>;
            settings: z.ZodObject<{
                autoplay: z.ZodDefault<z.ZodBoolean>;
                loop: z.ZodDefault<z.ZodBoolean>;
                muted: z.ZodDefault<z.ZodBoolean>;
                controls: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                loop: boolean;
                autoplay: boolean;
                muted: boolean;
                controls: boolean;
            }, {
                loop?: boolean | undefined;
                autoplay?: boolean | undefined;
                muted?: boolean | undefined;
                controls?: boolean | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "video";
            settings: {
                loop: boolean;
                autoplay: boolean;
                muted: boolean;
                controls: boolean;
            };
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        }, {
            id: string;
            type: "video";
            settings: {
                loop?: boolean | undefined;
                autoplay?: boolean | undefined;
                muted?: boolean | undefined;
                controls?: boolean | undefined;
            };
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"menuItem">;
            data: z.ZodObject<{
                name: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                price: z.ZodString;
                image: z.ZodOptional<z.ZodString>;
                tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                dietary: z.ZodDefault<z.ZodArray<z.ZodEnum<["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"]>, "many">>;
                spiceLevel: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                tags: string[];
                price: string;
                dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
                description?: string | undefined;
                image?: string | undefined;
                spiceLevel?: number | undefined;
            }, {
                name: string;
                price: string;
                description?: string | undefined;
                tags?: string[] | undefined;
                image?: string | undefined;
                dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
                spiceLevel?: number | undefined;
            }>;
            layout: z.ZodDefault<z.ZodEnum<["horizontal", "vertical", "card", "list"]>>;
            style: z.ZodObject<{
                nameStyle: z.ZodAny;
                descriptionStyle: z.ZodOptional<z.ZodAny>;
                priceStyle: z.ZodAny;
                backgroundColor: z.ZodOptional<z.ZodString>;
                borderColor: z.ZodOptional<z.ZodString>;
                padding: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            }, {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "menuItem";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                tags: string[];
                price: string;
                dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
                description?: string | undefined;
                image?: string | undefined;
                spiceLevel?: number | undefined;
            };
            layout: "horizontal" | "vertical" | "card" | "list";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }, {
            id: string;
            type: "menuItem";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                price: string;
                description?: string | undefined;
                tags?: string[] | undefined;
                image?: string | undefined;
                dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
                spiceLevel?: number | undefined;
            };
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
        }>, z.ZodObject<{
            id: z.ZodString;
            layer: z.ZodNumber;
            locked: z.ZodDefault<z.ZodBoolean>;
            visible: z.ZodDefault<z.ZodBoolean>;
            position: z.ZodObject<{
                x: z.ZodNumber;
                y: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            size: z.ZodObject<{
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                width: number;
                height: number;
            }, {
                width: number;
                height: number;
            }>;
            rotation: z.ZodDefault<z.ZodNumber>;
            opacity: z.ZodDefault<z.ZodNumber>;
            animation: z.ZodOptional<z.ZodObject<{
                enter: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                exit: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    delay: z.ZodOptional<z.ZodNumber>;
                    easing: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                }>>;
                loop: z.ZodOptional<z.ZodObject<{
                    type: z.ZodOptional<z.ZodString>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    repeat: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }, {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }, {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            }>>;
        } & {
            type: z.ZodLiteral<"shape">;
            shapeType: z.ZodEnum<["rectangle", "circle", "triangle", "line", "polygon", "star"]>;
            style: z.ZodObject<{
                fill: z.ZodOptional<z.ZodString>;
                stroke: z.ZodOptional<z.ZodString>;
                strokeWidth: z.ZodOptional<z.ZodNumber>;
                strokeDasharray: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            }, {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "shape";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }, {
            id: string;
            type: "shape";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        elements: ({
            id: string;
            type: "section";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "text";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "image";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        } | {
            id: string;
            type: "video";
            settings: {
                loop: boolean;
                autoplay: boolean;
                muted: boolean;
                controls: boolean;
            };
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        } | {
            id: string;
            type: "menuItem";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                tags: string[];
                price: string;
                dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
                description?: string | undefined;
                image?: string | undefined;
                spiceLevel?: number | undefined;
            };
            layout: "horizontal" | "vertical" | "card" | "list";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "shape";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        })[];
        duration?: number | undefined;
        transition?: {
            type: string;
            duration: number;
            easing: string;
        } | undefined;
    }, {
        id: string;
        name: string;
        elements: ({
            id: string;
            type: "section";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "text";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "image";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        } | {
            id: string;
            type: "video";
            settings: {
                loop?: boolean | undefined;
                autoplay?: boolean | undefined;
                muted?: boolean | undefined;
                controls?: boolean | undefined;
            };
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        } | {
            id: string;
            type: "menuItem";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                price: string;
                description?: string | undefined;
                tags?: string[] | undefined;
                image?: string | undefined;
                dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
                spiceLevel?: number | undefined;
            };
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
        } | {
            id: string;
            type: "shape";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        })[];
        duration?: number | undefined;
        transition?: {
            type: string;
            duration: number;
            easing: string;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    metadata: {
        name: string;
        createdAt: string;
        updatedAt: string;
        tags: string[];
        description?: string | undefined;
        author?: string | undefined;
        organization?: string | undefined;
        category?: "restaurant" | "cafe" | "bar" | "retail" | "healthcare" | "education" | "corporate" | undefined;
    };
    settings: {
        canvas: {
            width: number;
            height: number;
            aspectRatio: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4";
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
        };
        theme?: {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        } | undefined;
        animations?: {
            pageTransition: "none" | "fade" | "slide" | "zoom" | "flip" | "cube";
            elementAnimation: boolean;
            autoPlayDuration?: number | undefined;
        } | undefined;
    };
    pages: {
        id: string;
        name: string;
        elements: ({
            id: string;
            type: "section";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "text";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "image";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        } | {
            id: string;
            type: "video";
            settings: {
                loop: boolean;
                autoplay: boolean;
                muted: boolean;
                controls: boolean;
            };
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            src: string;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        } | {
            id: string;
            type: "menuItem";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                tags: string[];
                price: string;
                dietary: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[];
                description?: string | undefined;
                image?: string | undefined;
                spiceLevel?: number | undefined;
            };
            layout: "horizontal" | "vertical" | "card" | "list";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "shape";
            layer: number;
            locked: boolean;
            visible: boolean;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            rotation: number;
            opacity: number;
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        })[];
        duration?: number | undefined;
        transition?: {
            type: string;
            duration: number;
            easing: string;
        } | undefined;
    }[];
}, {
    id: string;
    version: string;
    metadata: {
        name: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        author?: string | undefined;
        organization?: string | undefined;
        tags?: string[] | undefined;
        category?: "restaurant" | "cafe" | "bar" | "retail" | "healthcare" | "education" | "corporate" | undefined;
    };
    settings: {
        canvas: {
            width?: number | undefined;
            height?: number | undefined;
            backgroundColor?: string | undefined;
            backgroundImage?: string | undefined;
            aspectRatio?: "custom" | "16:9" | "9:16" | "1:1" | "4:3" | "3:4" | undefined;
        };
        theme?: {
            primaryColor: string;
            secondaryColor?: string | undefined;
            accentColor?: string | undefined;
            textColor?: string | undefined;
            fonts?: {
                heading?: string | undefined;
                body?: string | undefined;
                price?: string | undefined;
            } | undefined;
        } | undefined;
        animations?: {
            pageTransition?: "none" | "fade" | "slide" | "zoom" | "flip" | "cube" | undefined;
            elementAnimation?: boolean | undefined;
            autoPlayDuration?: number | undefined;
        } | undefined;
    };
    pages: {
        id: string;
        name: string;
        elements: ({
            id: string;
            type: "section";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                backgroundImage?: string | undefined;
                backgroundSize?: string | undefined;
                backgroundPosition?: string | undefined;
                borderRadius?: number | undefined;
                borderWidth?: number | undefined;
                borderColor?: string | undefined;
                shadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            children: string[];
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "text";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                color: string;
                fontFamily: string;
                fontSize: number;
                fontWeight?: string | undefined;
                fontStyle?: string | undefined;
                textAlign?: "left" | "center" | "right" | "justify" | undefined;
                lineHeight?: number | undefined;
                letterSpacing?: number | undefined;
                textDecoration?: string | undefined;
                textShadow?: {
                    x: number;
                    y: number;
                    blur: number;
                    color: string;
                } | undefined;
            };
            content: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        } | {
            id: string;
            type: "image";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            style?: {
                filter?: {
                    blur?: number | undefined;
                    brightness?: number | undefined;
                    contrast?: number | undefined;
                    grayscale?: number | undefined;
                } | undefined;
                borderRadius?: number | undefined;
                objectFit?: "fill" | "none" | "contain" | "cover" | "scale-down" | undefined;
            } | undefined;
            alt?: string | undefined;
        } | {
            id: string;
            type: "video";
            settings: {
                loop?: boolean | undefined;
                autoplay?: boolean | undefined;
                muted?: boolean | undefined;
                controls?: boolean | undefined;
            };
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            src: string;
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            poster?: string | undefined;
        } | {
            id: string;
            type: "menuItem";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                backgroundColor?: string | undefined;
                borderColor?: string | undefined;
                nameStyle?: any;
                descriptionStyle?: any;
                priceStyle?: any;
                padding?: number | undefined;
            };
            data: {
                name: string;
                price: string;
                description?: string | undefined;
                tags?: string[] | undefined;
                image?: string | undefined;
                dietary?: ("vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "halal" | "kosher")[] | undefined;
                spiceLevel?: number | undefined;
            };
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
            layout?: "horizontal" | "vertical" | "card" | "list" | undefined;
        } | {
            id: string;
            type: "shape";
            layer: number;
            position: {
                x: number;
                y: number;
            };
            size: {
                width: number;
                height: number;
            };
            style: {
                fill?: string | undefined;
                stroke?: string | undefined;
                strokeWidth?: number | undefined;
                strokeDasharray?: string | undefined;
            };
            shapeType: "rectangle" | "circle" | "triangle" | "line" | "polygon" | "star";
            locked?: boolean | undefined;
            visible?: boolean | undefined;
            rotation?: number | undefined;
            opacity?: number | undefined;
            animation?: {
                enter?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                exit?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    easing?: string | undefined;
                    delay?: number | undefined;
                } | undefined;
                loop?: {
                    type?: string | undefined;
                    duration?: number | undefined;
                    repeat?: number | undefined;
                } | undefined;
            } | undefined;
        })[];
        duration?: number | undefined;
        transition?: {
            type: string;
            duration: number;
            easing: string;
        } | undefined;
    }[];
}>;
export type BaseElement = z.infer<typeof BaseElementSchema>;
export type TextElement = z.infer<typeof TextElementSchema>;
export type ImageElement = z.infer<typeof ImageElementSchema>;
export type VideoElement = z.infer<typeof VideoElementSchema>;
export type MenuItemElement = z.infer<typeof MenuItemElementSchema>;
export type ShapeElement = z.infer<typeof ShapeElementSchema>;
export type SectionElement = z.infer<typeof SectionElementSchema>;
export type Element = z.infer<typeof ElementSchema>;
export type Page = z.infer<typeof PageSchema>;
export type MenuTemplate = z.infer<typeof MenuTemplateSchema>;
export type AnimationType = 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'zoomIn' | 'zoomOut' | 'rotate' | 'bounce' | 'pulse';
export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
export interface CanvasState {
    zoom: number;
    pan: {
        x: number;
        y: number;
    };
    gridEnabled: boolean;
    snapEnabled: boolean;
    rulerEnabled: boolean;
    selectedElements: string[];
    clipboard: Element[];
}
//# sourceMappingURL=menu.types.d.ts.map