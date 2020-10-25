import { AriaAttributes, ClassAttributes, DOMAttributes } from "react";

/**
 * Allow using the 'class' attribute on web-components.
 * 
 * @note React generates a useless 'classname' attribute instead of 'class' when 
 *       using the 'is' attribute on web-components.
 */
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T>, ClassAttributes<T>{
        class?: string;
    }
}