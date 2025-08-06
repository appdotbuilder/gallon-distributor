<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'monthly_quota' => 'required|integer|min:1|max:100',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Employee name is required.',
            'monthly_quota.required' => 'Monthly quota is required.',
            'monthly_quota.min' => 'Monthly quota must be at least 1 gallon.',
            'monthly_quota.max' => 'Monthly quota cannot exceed 100 gallons.',
            'status.required' => 'Employee status is required.',
            'status.in' => 'Employee status must be either active or inactive.',
        ];
    }
}