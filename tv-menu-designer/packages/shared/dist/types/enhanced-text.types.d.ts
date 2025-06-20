import { z } from 'zod';
export declare const TextShadowSchema: z.ZodObject<{
    color: z.ZodString;
    blur: z.ZodNumber;
    offsetX: z.ZodNumber;
    offsetY: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
}, {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
}>;
export declare const TextOutlineSchema: z.ZodObject<{
    color: z.ZodString;
    width: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    color: string;
    width: number;
}, {
    color: string;
    width: number;
}>;
export declare const TextGradientSchema: z.ZodObject<{
    type: z.ZodEnum<["linear", "radial"]>;
    colors: z.ZodArray<z.ZodString, "many">;
    angle: z.ZodOptional<z.ZodNumber>;
    centerX: z.ZodOptional<z.ZodNumber>;
    centerY: z.ZodOptional<z.ZodNumber>;
    radius: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "linear" | "radial";
    colors: string[];
    angle?: number | undefined;
    centerX?: number | undefined;
    centerY?: number | undefined;
    radius?: number | undefined;
}, {
    type: "linear" | "radial";
    colors: string[];
    angle?: number | undefined;
    centerX?: number | undefined;
    centerY?: number | undefined;
    radius?: number | undefined;
}>;
export declare const TextGlowSchema: z.ZodObject<{
    color: z.ZodString;
    intensity: z.ZodNumber;
    spread: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    color: string;
    intensity: number;
    spread: number;
}, {
    color: string;
    intensity: number;
    spread: number;
}>;
export declare const EnhancedTextElementSchema: z.ZodObject<{
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
            delay?: number | undefined;
            easing?: string | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        }>>;
        exit: z.ZodOptional<z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            duration: z.ZodOptional<z.ZodNumber>;
            delay: z.ZodOptional<z.ZodNumber>;
            easing: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        }, {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
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
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
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
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    }>>;
    type: z.ZodLiteral<"text">;
    content: z.ZodString;
} & {
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
            color: string;
            blur: number;
            x: number;
            y: number;
        }, {
            color: string;
            blur: number;
            x: number;
            y: number;
        }>>;
    } & {
        textTransform: z.ZodOptional<z.ZodEnum<["none", "uppercase", "lowercase", "capitalize"]>>;
        wordSpacing: z.ZodOptional<z.ZodNumber>;
        textIndent: z.ZodOptional<z.ZodNumber>;
        whiteSpace: z.ZodOptional<z.ZodEnum<["normal", "nowrap", "pre", "pre-wrap", "pre-line"]>>;
        textStroke: z.ZodOptional<z.ZodObject<{
            color: z.ZodString;
            width: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            width: number;
        }, {
            color: string;
            width: number;
        }>>;
        textGradient: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["linear", "radial"]>;
            colors: z.ZodArray<z.ZodString, "many">;
            angle: z.ZodOptional<z.ZodNumber>;
            centerX: z.ZodOptional<z.ZodNumber>;
            centerY: z.ZodOptional<z.ZodNumber>;
            radius: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }>>;
        textGlow: z.ZodOptional<z.ZodObject<{
            color: z.ZodString;
            intensity: z.ZodNumber;
            spread: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            intensity: number;
            spread: number;
        }, {
            color: string;
            intensity: number;
            spread: number;
        }>>;
        multipleShadows: z.ZodOptional<z.ZodArray<z.ZodObject<{
            color: z.ZodString;
            blur: z.ZodNumber;
            offsetX: z.ZodNumber;
            offsetY: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }, {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }>, "many">>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundGradient: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["linear", "radial"]>;
            colors: z.ZodArray<z.ZodString, "many">;
            angle: z.ZodOptional<z.ZodNumber>;
            centerX: z.ZodOptional<z.ZodNumber>;
            centerY: z.ZodOptional<z.ZodNumber>;
            radius: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }>>;
        backgroundPadding: z.ZodOptional<z.ZodObject<{
            top: z.ZodNumber;
            right: z.ZodNumber;
            bottom: z.ZodNumber;
            left: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }>>;
        backgroundBorderRadius: z.ZodOptional<z.ZodNumber>;
        writingMode: z.ZodOptional<z.ZodEnum<["horizontal-tb", "vertical-rl", "vertical-lr"]>>;
        textOrientation: z.ZodOptional<z.ZodEnum<["mixed", "upright", "sideways"]>>;
        direction: z.ZodOptional<z.ZodEnum<["ltr", "rtl"]>>;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    }>;
    richContent: z.ZodOptional<z.ZodObject<{
        blocks: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["paragraph", "heading", "list"]>;
            content: z.ZodArray<z.ZodObject<{
                text: z.ZodString;
                marks: z.ZodOptional<z.ZodArray<z.ZodEnum<["bold", "italic", "underline", "strikethrough", "code", "superscript", "subscript"]>, "many">>;
                color: z.ZodOptional<z.ZodString>;
                backgroundColor: z.ZodOptional<z.ZodString>;
                fontSize: z.ZodOptional<z.ZodNumber>;
                fontFamily: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }, {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }, {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        blocks: {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }[];
    }, {
        blocks: {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }[];
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "text";
    id: string;
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
    content: string;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    };
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    richContent?: {
        blocks: {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }[];
    } | undefined;
}, {
    type: "text";
    id: string;
    layer: number;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    content: string;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    };
    locked?: boolean | undefined;
    visible?: boolean | undefined;
    rotation?: number | undefined;
    opacity?: number | undefined;
    animation?: {
        enter?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        exit?: {
            type?: string | undefined;
            duration?: number | undefined;
            delay?: number | undefined;
            easing?: string | undefined;
        } | undefined;
        loop?: {
            type?: string | undefined;
            duration?: number | undefined;
            repeat?: number | undefined;
        } | undefined;
    } | undefined;
    richContent?: {
        blocks: {
            type: "paragraph" | "heading" | "list";
            id: string;
            content: {
                text: string;
                color?: string | undefined;
                fontFamily?: string | undefined;
                fontSize?: number | undefined;
                backgroundColor?: string | undefined;
                marks?: ("code" | "bold" | "italic" | "underline" | "strikethrough" | "superscript" | "subscript")[] | undefined;
            }[];
        }[];
    } | undefined;
}>;
export declare const FontConfigSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    family: z.ZodString;
    category: z.ZodEnum<["serif", "sans-serif", "display", "handwriting", "monospace"]>;
    variants: z.ZodArray<z.ZodObject<{
        weight: z.ZodNumber;
        style: z.ZodEnum<["normal", "italic"]>;
        src: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        style: "normal" | "italic";
        weight: number;
        src: string;
    }, {
        style: "normal" | "italic";
        weight: number;
        src: string;
    }>, "many">;
    fallback: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    source: z.ZodEnum<["google", "adobe", "custom", "system"]>;
    license: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    family: string;
    category: "serif" | "sans-serif" | "display" | "handwriting" | "monospace";
    variants: {
        style: "normal" | "italic";
        weight: number;
        src: string;
    }[];
    source: "custom" | "google" | "adobe" | "system";
    fallback?: string[] | undefined;
    license?: string | undefined;
}, {
    id: string;
    name: string;
    family: string;
    category: "serif" | "sans-serif" | "display" | "handwriting" | "monospace";
    variants: {
        style: "normal" | "italic";
        weight: number;
        src: string;
    }[];
    source: "custom" | "google" | "adobe" | "system";
    fallback?: string[] | undefined;
    license?: string | undefined;
}>;
export declare const TextStylePresetSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<["heading", "body", "accent", "special"]>;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        }, {
            color: string;
            blur: number;
            x: number;
            y: number;
        }>>;
    } & {
        textTransform: z.ZodOptional<z.ZodEnum<["none", "uppercase", "lowercase", "capitalize"]>>;
        wordSpacing: z.ZodOptional<z.ZodNumber>;
        textIndent: z.ZodOptional<z.ZodNumber>;
        whiteSpace: z.ZodOptional<z.ZodEnum<["normal", "nowrap", "pre", "pre-wrap", "pre-line"]>>;
        textStroke: z.ZodOptional<z.ZodObject<{
            color: z.ZodString;
            width: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            width: number;
        }, {
            color: string;
            width: number;
        }>>;
        textGradient: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["linear", "radial"]>;
            colors: z.ZodArray<z.ZodString, "many">;
            angle: z.ZodOptional<z.ZodNumber>;
            centerX: z.ZodOptional<z.ZodNumber>;
            centerY: z.ZodOptional<z.ZodNumber>;
            radius: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }>>;
        textGlow: z.ZodOptional<z.ZodObject<{
            color: z.ZodString;
            intensity: z.ZodNumber;
            spread: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            intensity: number;
            spread: number;
        }, {
            color: string;
            intensity: number;
            spread: number;
        }>>;
        multipleShadows: z.ZodOptional<z.ZodArray<z.ZodObject<{
            color: z.ZodString;
            blur: z.ZodNumber;
            offsetX: z.ZodNumber;
            offsetY: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }, {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }>, "many">>;
        backgroundColor: z.ZodOptional<z.ZodString>;
        backgroundGradient: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<["linear", "radial"]>;
            colors: z.ZodArray<z.ZodString, "many">;
            angle: z.ZodOptional<z.ZodNumber>;
            centerX: z.ZodOptional<z.ZodNumber>;
            centerY: z.ZodOptional<z.ZodNumber>;
            radius: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }, {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        }>>;
        backgroundPadding: z.ZodOptional<z.ZodObject<{
            top: z.ZodNumber;
            right: z.ZodNumber;
            bottom: z.ZodNumber;
            left: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }, {
            left: number;
            right: number;
            top: number;
            bottom: number;
        }>>;
        backgroundBorderRadius: z.ZodOptional<z.ZodNumber>;
        writingMode: z.ZodOptional<z.ZodEnum<["horizontal-tb", "vertical-rl", "vertical-lr"]>>;
        textOrientation: z.ZodOptional<z.ZodEnum<["mixed", "upright", "sideways"]>>;
        direction: z.ZodOptional<z.ZodEnum<["ltr", "rtl"]>>;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    }>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    };
    name: string;
    category: "heading" | "body" | "accent" | "special";
    thumbnail?: string | undefined;
}, {
    id: string;
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
            color: string;
            blur: number;
            x: number;
            y: number;
        } | undefined;
        textTransform?: "none" | "uppercase" | "lowercase" | "capitalize" | undefined;
        wordSpacing?: number | undefined;
        textIndent?: number | undefined;
        whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line" | undefined;
        textStroke?: {
            color: string;
            width: number;
        } | undefined;
        textGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        textGlow?: {
            color: string;
            intensity: number;
            spread: number;
        } | undefined;
        multipleShadows?: {
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
        }[] | undefined;
        backgroundColor?: string | undefined;
        backgroundGradient?: {
            type: "linear" | "radial";
            colors: string[];
            angle?: number | undefined;
            centerX?: number | undefined;
            centerY?: number | undefined;
            radius?: number | undefined;
        } | undefined;
        backgroundPadding?: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        } | undefined;
        backgroundBorderRadius?: number | undefined;
        writingMode?: "horizontal-tb" | "vertical-rl" | "vertical-lr" | undefined;
        textOrientation?: "mixed" | "upright" | "sideways" | undefined;
        direction?: "ltr" | "rtl" | undefined;
    };
    name: string;
    category: "heading" | "body" | "accent" | "special";
    thumbnail?: string | undefined;
}>;
export type EnhancedTextElement = z.infer<typeof EnhancedTextElementSchema>;
export type TextShadow = z.infer<typeof TextShadowSchema>;
export type TextOutline = z.infer<typeof TextOutlineSchema>;
export type TextGradient = z.infer<typeof TextGradientSchema>;
export type TextGlow = z.infer<typeof TextGlowSchema>;
export type FontConfig = z.infer<typeof FontConfigSchema>;
export type TextStylePreset = z.infer<typeof TextStylePresetSchema>;
export declare const DEFAULT_FONTS: FontConfig[];
export declare const TEXT_STYLE_PRESETS: TextStylePreset[];
//# sourceMappingURL=enhanced-text.types.d.ts.map