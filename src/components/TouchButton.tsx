import React from 'react';

export type TouchButtonVariant = 'primary' | 'secondary' | 'outline' | 'soft' | 'dark' | 'ghost';
export type TouchButtonSize = 'sm' | 'md' | 'lg';

export interface TouchButtonProps {
  children: React.ReactNode;
  variant?: TouchButtonVariant;
  size?: TouchButtonSize;
  fullWidthOnMobile?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  title?: string;
}

export const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidthOnMobile = true,
  icon,
  iconPosition = 'left',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  title,
}) => {
  // Base unified touch-friendly styles
  // - min-h-[44px] & min-w-[44px] strictly enforced for accessibility
  // - max-w-full prevents horizontal scrollbars and viewport overflow on narrow screens (e.g. 320px)
  // - touch-action: manipulation prevents double-tap zoom delays
  // - active:scale-[0.98] provides immediate tactile haptic-like response
  const baseClasses =
    'touch-cta relative font-heading font-bold select-none cursor-pointer text-center ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9FE4] focus-visible:ring-offset-2 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ' +
    (fullWidthOnMobile ? 'w-full sm:w-auto ' : 'w-auto ');

  // Size configurations
  const sizeClasses: Record<TouchButtonSize, string> = {
    sm: 'min-h-[44px] px-3.5 sm:px-4 py-2 text-xs rounded-xl gap-1.5',
    md: 'min-h-[46px] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl sm:rounded-2xl gap-2',
    lg: 'min-h-[50px] px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-2xl gap-2.5',
  };

  // Color & Visual Variants (Tait Maintained Brand Palette)
  const variantClasses: Record<TouchButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-[#2A9FE4] to-[#6FC5ED] hover:from-[#2A9FE4] hover:to-[#2A9FE4] text-[#FDFDFE] ' +
      'shadow-md shadow-[#2A9FE4]/25 hover:shadow-lg hover:shadow-[#2A9FE4]/35 border border-transparent',
    secondary:
      'bg-[#DCE6ED]/80 hover:bg-[#DCE6ED] text-[#0d2030] border border-[#DCE6ED] shadow-xs',
    outline:
      'bg-[#FDFDFE] hover:bg-[#DCE6ED]/40 text-[#0d2030] border border-[#DCE6ED] hover:border-[#2A9FE4] shadow-xs',
    soft:
      'bg-[#2A9FE4]/10 hover:bg-[#2A9FE4]/20 text-[#2A9FE4] border border-[#2A9FE4]/30',
    dark:
      'bg-[#0d2030] hover:bg-[#243b4d] text-[#FDFDFE] shadow-md border border-[#243b4d]',
    ghost:
      'bg-transparent hover:bg-[#DCE6ED]/60 text-[#0d2030] border border-transparent',
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  // Content with optional icon left/right
  const content = (
    <span className="inline-flex items-center justify-center gap-2 max-w-full">
      {icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      <span className="truncate">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </span>
  );

  // Link mode
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        className={combinedClasses}
        aria-label={ariaLabel}
        title={title}
      >
        {content}
      </a>
    );
  }

  // Button mode
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
      title={title}
    >
      {content}
    </button>
  );
};
