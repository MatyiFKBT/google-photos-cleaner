import clsx from 'clsx'
import type { UseFormReturn } from 'react-hook-form'
import { Input } from './input'
import { Label } from './label'

interface FormItemProps {
  label: string
  text?: string
  methods: UseFormReturn<any>
  type?: string
  small?: boolean
}

export default function FormItem({
  label,
  text,
  methods,
  type,
  small,
}: FormItemProps) {
	const error = methods.formState.errors[label]
  return (
    <div className="grid w-full max-w-xs items-center gap-1.5 form-control">
      <Label htmlFor={label}>
        {text}
      </Label>
      {type === 'textarea' // todo
        ? (
        <textarea
          {...methods.register(label)}
          className={clsx('textarea textarea-bordered', {
            'textarea-error': error?.message,
          })}
          aria-invalid={!!error}
        />
          )
        : (
        <Input
          {...methods.register(label)}
          placeholder="..."
          type={type || 'text'}
          name={label}
          id={label}
          aria-invalid={!!error}
        />
          )}
      {error && (
        <p className="mt-1 text-red-700">
          {error?.message as string}
        </p>
      )}
			{!error && (
				<p className="mt-1 text-gray-500">
					enter your {label}
				</p>
			)}
    </div>
  )
}