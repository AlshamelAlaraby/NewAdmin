<?php

namespace App\Http\Requests\ProjectProgramModule;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateNewMenuItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $request =  request();

        return [
            'inside_type' => 'required|in:module,folder,program',
            'type' => 'required|in:page,folder,module',
            'page_id' => ['required_if:type,page',$request->type == 'page' ? 'exists:screens,id' :'',
                Rule::unique('module_menus')->whereNotNull('page_id')->where(function ($query) use($request) {
                    if($request->inside_type == 'module')
                        return $query->where('module_id', $request->inside_id);
                    elseif($request->inside_type == 'folder')
                        return $query->where('folder_id', $request->inside_id);
                }),],
            'module_id' => $request->inside_type == 'program' ?[
                Rule::exists('project_program_modules','id')->whereNull('parent_id')->where('is_module',1)] : [],
            'inside_id' => ['required',
                $request->inside_type == 'program'  ? Rule::exists('project_program_modules','id')->whereNull('parent_id')->where('is_module',0):''],
            'name' => [
                'required_if:type,folder',
                Rule::unique('module_menus')->whereNotNull('name')->where(function ($query) use($request) {
                    if($request->inside_type == 'module')
                        return $query->where('module_id', $request->inside_id);
                    elseif($request->inside_type == 'folder')
                        return $query->where('folder_id', $request->inside_id);
                }),
            ],
            'name_e' => [
                'required_if:type,folder',
                Rule::unique('module_menus')->whereNotNull('name_e')->where(function ($query) use($request) {
                    if($request->inside_type == 'module')
                        return $query->where('module_id', $request->inside_id);
                    elseif($request->inside_type == 'folder')
                        return $query->where('folder_id', $request->inside_id);
                }),
            ],

            'sort' => [
                'required',
                'integer',
                'min:0',
                $request->inside_type == 'program' ?
                Rule::unique('project_program_modules')->where(function ($query) use($request) {
                    return $query->where('parent_id', $request->inside_id);
                })->whereNull('deleted_at'):
                Rule::unique('module_menus')->where(function ($query) use($request) {
                    if($request->inside_type == 'module')
                        return $query->where('module_id', $request->inside_id)->whereNull('folder_id');
                    elseif($request->inside_type == 'folder')
                        return $query->where('folder_id', $request->inside_id);

                })->whereNull('deleted_at'),
            ],

        ];
    }
}
