'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Calculator, Check, Delete, X, Equal, HelpCircle } from 'lucide-react'
import { evaluateExpression, hasMathOperators } from '@/lib/math-evaluator'

interface AmountCalculatorInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
  id?: string
}

function formatThousandsOnly(val: string): string {
  const digits = val.replace(/[^0-9]/g, '')
  if (!digits) return ''
  return new Intl.NumberFormat('id-ID').format(parseInt(digits, 10))
}

export function formatMathExpression(expr: string): string {
  if (!expr) return ''
  return expr.replace(/([\d.,]+)/g, (match) => {
    const withoutDots = match.replace(/\./g, '')
    const parts = withoutDots.split(',')
    const intPart = parts[0]
    if (!intPart) return match
    
    const formattedInt = new Intl.NumberFormat('id-ID').format(parseInt(intPart, 10))
    if (parts.length > 1) {
      return formattedInt + ',' + parts[1]
    }
    return formattedInt
  })
}

export default function AmountCalculatorInput({
  value,
  onChange,
  placeholder = '0',
  required = false,
  className = '',
  id
}: AmountCalculatorInputProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Evaluate current value if it has operators
  const isMathExpr = hasMathOperators(value)
  const evalState = isMathExpr ? evaluateExpression(value) : { result: null, formattedResult: null, error: null }

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto scroll into view (center) & focus input when popover is opened
  useEffect(() => {
    if (popoverOpen) {
      setTimeout(() => {
        popoverRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
        inputRef.current?.focus()
      }, 50)
    }
  }, [popoverOpen])

  // Global key listener when calculator modal is open
  useEffect(() => {
    if (!popoverOpen) return

    function handleGlobalKeyDown(e: KeyboardEvent) {
      // Don't intercept if user is actively focused on input (since handleInputChange / handleKeyDown will handle it)
      if (document.activeElement === inputRef.current) return

      if (e.key === 'Escape') {
        setPopoverOpen(false)
        return
      }

      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        applyResult()
        return
      }

      if (e.key === 'Backspace') {
        e.preventDefault()
        handleKeypadBackspace()
        return
      }

      // Check if key is a digit or operator
      if (/^[0-9+\-*\/()]$/.test(e.key)) {
        e.preventDefault()
        handleKeypadAppend(e.key === '*' ? ' * ' : e.key === '/' ? ' / ' : e.key === '+' ? ' + ' : e.key === '-' ? ' - ' : e.key)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [popoverOpen, value, isMathExpr, evalState])

  // Handle direct text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (hasMathOperators(raw)) {
      // Keep expression as user typed it
      onChange(raw)
    } else {
      // Format single numbers with thousands separator
      onChange(formatThousandsOnly(raw))
    }
  }

  // Handle keypress inside text input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isMathExpr && evalState.formattedResult) {
        e.preventDefault()
        applyResult()
      }
    } else if (e.key === '=') {
      if (isMathExpr && evalState.formattedResult) {
        e.preventDefault()
        applyResult()
      }
    }
  }

  // Apply calculated result to input and close popover
  const applyResult = () => {
    if (isMathExpr) {
      if (evalState.formattedResult !== null) {
        onChange(evalState.formattedResult)
        setPopoverOpen(false)
      }
    } else {
      if (value) {
        onChange(formatThousandsOnly(value))
      }
      setPopoverOpen(false)
    }
  }

  // Apply calculated result but keep popover open
  const applyResultKeepOpen = () => {
    if (isMathExpr) {
      if (evalState.formattedResult !== null) {
        onChange(evalState.formattedResult)
      }
    } else if (value) {
      onChange(formatThousandsOnly(value))
    }
  }

  // Keypad actions
  const handleKeypadAppend = (token: string) => {
    const newValue = value + token
    if (hasMathOperators(newValue)) {
      onChange(newValue)
    } else {
      onChange(formatThousandsOnly(newValue))
    }
  }

  const handleKeypadClear = () => {
    onChange('')
  }

  const handleKeypadBackspace = () => {
    if (value.length > 0) {
      const newValue = value.slice(0, -1)
      if (hasMathOperators(newValue)) {
        onChange(newValue)
      } else {
        onChange(formatThousandsOnly(newValue))
      }
    }
  }

  return (
    <div className="relative w-full" ref={popoverRef}>
      {/* Input container */}
      <div className="relative flex items-center">
        <span className="absolute left-4 text-slate-400 text-sm font-semibold pointer-events-none z-10">
          Rp
        </span>

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-11 pr-12 py-3 rounded-xl border border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-sm font-semibold outline-none transition-all ${className}`}
        />

        {/* Toggle Calculator Popover Button */}
        <button
          type="button"
          onClick={() => setPopoverOpen(prev => !prev)}
          title="Buka Kalkulator"
          className={`absolute right-2 p-2 rounded-lg transition-all cursor-pointer ${
            popoverOpen || isMathExpr
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
          }`}
        >
          <Calculator size={18} />
        </button>
      </div>

      {/* Live Preview Pill under input box when typing math expression */}
      {isMathExpr && (
        <div className="mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-blue-500/30 flex items-center justify-between text-xs animate-fade-in shadow-lg">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <span className="text-blue-400 font-bold shrink-0">💡 Hasil:</span>
            {evalState.error ? (
              <span className="text-amber-400 italic truncate">{evalState.error}</span>
            ) : evalState.formattedResult !== null ? (
              <span className="text-emerald-400 font-extrabold text-sm tracking-wide">
                Rp {evalState.formattedResult}
              </span>
            ) : (
              <span className="text-slate-400 italic">Menghitung...</span>
            )}
          </div>

          {evalState.formattedResult !== null && (
            <button
              type="button"
              onClick={applyResult}
              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-md"
            >
              <span>Selesai</span>
              <Check size={13} />
            </button>
          )}
        </div>
      )}

      {/* Visual Calculator Modal / Keypad */}
      {popoverOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-5 backdrop-blur-xl animate-scale-up">
            {/* Keypad Header Display */}
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calculator size={16} className="text-blue-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Kalkulator Nominal
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPopoverOpen(false)}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>

          {/* Current Expression & Result Monitor */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl mb-4 text-right overflow-hidden">
            <div className="text-xs text-slate-400 truncate mb-0.5">
              {isMathExpr ? formatMathExpression(value) : formatThousandsOnly(value) || '0'}
            </div>
            <div className="text-lg font-black text-emerald-400 truncate">
              {isMathExpr
                ? evalState.formattedResult !== null
                  ? `Rp ${evalState.formattedResult}`
                  : evalState.error || '...'
                : value
                ? `Rp ${formatThousandsOnly(value)}`
                : 'Rp 0'}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <button
              type="button"
              onClick={handleKeypadClear}
              className="py-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 font-bold text-xs transition-colors cursor-pointer"
            >
              AC
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('(')}
              className="py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              (
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend(')')}
              className="py-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              )
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend(' / ')}
              className="py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 font-extrabold text-base transition-colors cursor-pointer"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              type="button"
              onClick={() => handleKeypadAppend('7')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('8')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('9')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend(' * ')}
              className="py-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 font-extrabold text-base transition-colors cursor-pointer"
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              type="button"
              onClick={() => handleKeypadAppend('4')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('5')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('6')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend(' - ')}
              className="py-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 font-extrabold text-base transition-colors cursor-pointer"
            >
              -
            </button>

            {/* Row 4 */}
            <button
              type="button"
              onClick={() => handleKeypadAppend('1')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('2')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('3')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend(' + ')}
              className="py-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/30 font-extrabold text-base transition-colors cursor-pointer"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              type="button"
              onClick={() => handleKeypadAppend('0')}
              className="py-3 rounded-xl bg-slate-800/80 text-white border border-slate-700/60 hover:bg-slate-700 font-bold text-base transition-colors cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('00')}
              className="py-3 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              00
            </button>
            <button
              type="button"
              onClick={() => handleKeypadAppend('000')}
              className="py-3 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              000
            </button>
            <button
              type="button"
              onClick={handleKeypadBackspace}
              className="py-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Delete size={18} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              onClick={applyResultKeepOpen}
              disabled={isMathExpr ? evalState.formattedResult === null : !value}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Equal size={16} />
              <span>Hitung</span>
            </button>
            <button
              type="button"
              onClick={applyResult}
              disabled={isMathExpr ? evalState.formattedResult === null : !value}
              className="py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Selesai</span>
              <Check size={16} />
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
