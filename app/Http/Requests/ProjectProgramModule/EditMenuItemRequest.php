<?php

namespace App\Http\Requests\ProjectProgramModule;

use App\Models\ModuleMenu;
use App\Models\ProjectProgramModule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditMenuItemRequest extends FormRequest
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

        $node = $request->node_type  == 'module' || $request->node_type  == 'program' ? ProjectProgramModule::find($request->node_id):ModuleMenu::find($request->node_id);
        request()->merge(['node' => $node]);
        return [
            'node_type' => 'required|in:page,folder,module,program',
            'module_dashboard_id' =>$request->node_type  == 'module'? 'required|exists:module_dashboards,id' :'',
            'node_id' => ['required' , $request->node_type == 'module' || $request->node_type == 'program'  ? 'exists:project_program_modules,id': 'exists:module_menus,id'],
            'name' => [
                'required_if:node_type,folder,module,program',
                $request->node_type == 'folder' ?
                Rule::unique('module_menus')->whereNotNull('name')->where(function ($query) use($node) {
                    if(!$node->folder_id)
                        return $query->where('module_id', $node->module_id);
                    elseif($node->folder_id)
                        return $query->where('folder_id', $node->folder_id);
                })->ignore($node->id) : Rule::unique('project_program_modules')->where('is_module',$request->node_type == 'module' ? 1 :0)->whereNull('deleted_at')->ignore($node->id),
            ],
            'name_e' => [
                'required_if:node_type,folder,module,program',
                $request->node_type == 'folder' ?
                Rule::unique('module_menus')->whereNotNull('name_e')->where(function ($query) use($node) {
                    if(!$node->folder_id)
                        return $query->where('module_id', $node->module_id);
                    elseif($node->folder_id)
                        return $query->where('folder_id', $node->folder_id);
                })->ignore($node->id) : Rule::unique('project_program_modules')->where('is_module',$request->node_type == 'module' ? 1 : 0)->whereNull('deleted_at')->ignore($node->id),
            ],
            'sort' => [
                isset($request->action) && $request->node_type == 'module' ? 'required':'required_if:node_type,page,folder',
                'integer',
                'min:0',
                isset($request->action) && $request->node_type == 'module' ? Rule::unique('project_program_modules')->where(function ($query) use($node) {
                        return $query->where('parent_id', $node->parent_id);

                })->whereNull('deleted_at')->ignore($node->id) :
                Rule::unique('module_menus')->where(function ($query) use($node) {
                    if(!$node->folder_id)
                        return $query->where('module_id', $node->module_id)->whereNull('folder_id');
                    elseif($node->folder_id)
                        return $query->where('folder_id', $node->folder_id);

                })->whereNull('deleted_at')->ignore($node->id),
            ],

        ];
    }
}
