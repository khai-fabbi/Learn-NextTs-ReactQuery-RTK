import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { object, string, z } from 'zod'

import type { Category, CategoryPost } from '@/models'

interface CategoryFormValue {
  name: string
  description: string
  is_active: boolean
}
export interface ICategoryFormProps {
  onSubmitFormValue?: (v: CategoryPost) => void
  categoryDetail?: Category
}

const categoryFormValueSchema = object({
  name: string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
    .min(1, 'Name is Required')
    .max(50),
  description: string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  })
    .min(1, 'Description is Required')
    .max(255),
  is_active: z.boolean(),
}).partial()

export default function CategoryForm({
  onSubmitFormValue = () => {},
  categoryDetail,
}: ICategoryFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CategoryFormValue>({
    resolver: zodResolver(categoryFormValueSchema),
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
    },
    mode: 'onSubmit',
  })
  useEffect(() => {
    if (isSubmitting) {
      reset({
        name: '',
        description: '',
        is_active: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting])
  useEffect(() => {
    if (categoryDetail) {
      reset({
        name: categoryDetail.name,
        description: categoryDetail.description,
        is_active: categoryDetail.is_active,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryDetail])
  const handleSubmitForm = (value: CategoryFormValue) => {
    onSubmitFormValue?.(value)
  }
  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className="w-full max-w-xs form-control">
        <label className="label" htmlFor="name-id">
          <span className="label-text text-primary">Name</span>
        </label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="text"
              placeholder="Enter your name"
              className={clsx(
                'w-full input input-primary placeholder:italic',
                errors.name && 'input-error'
              )}
              value={value}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text text-primary">Content</span>
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="text"
              placeholder="Enter your content"
              className={clsx(
                'w-full input input-primary placeholder:italic',
                errors.description && 'input-error'
              )}
              value={value}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <div className="w-full max-w-xs form-control">
        <label className="label">
          <span className="label-text text-primary">Active</span>
        </label>
        <Controller
          control={control}
          name="is_active"
          defaultValue={false}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="checkbox"
              placeholder="Enter your content"
              className="toggle toggle-primary toggle-lg"
              checked={value}
              ref={ref}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="mt-5 btn btn-primary w-fit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  )
}
