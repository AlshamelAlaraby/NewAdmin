<?php

use App\Http\Controllers\Auth\CheckIfValidTokenController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Button\ButtonController;
use App\Http\Controllers\CompanyProjectProgramModule\CompanyProjectProgramModuleController;
use App\Http\Controllers\Company\CompanyController;
use App\Http\Controllers\DocumentType\DocumentTypeController;
use App\Http\Controllers\Helpfile\HelpfileController;
use App\Http\Controllers\Hotfield\HotfieldController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ModuleScreenController;
use App\Http\Controllers\Partner\PartnerController;
use App\Http\Controllers\ScreenButton\ScreenButtonController;
use App\Http\Controllers\ScreenDocumentType\ScreenDocumentTypeController;
use App\Http\Controllers\ScreenHelpfile\ScreenHelpfileController;
use App\Http\Controllers\Screen\ScreenController;
use App\Http\Controllers\SettingScreen\SettingScreenController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::controller(\App\Http\Controllers\MainController::class)->group(function () {
    Route::put("/setting", "setting");
    Route::get("/setting/{user_id}/{screen_id}", "getSetting");
});

Route::get('/users', [UserController::class, "index"]);

/*
 * Auth
 */

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [LoginController::class, "login"]);
});

Route::group(['prefix' => 'auth', 'middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', [LogoutController::class, "logout"]);
    Route::post("/partner/logout", [LogoutController::class, "partnerLogout"]);
});

Route::group(['prefix' => 'auth', 'middleware' => 'auth:sanctum'], function () {
    Route::post('/check-token', [CheckIfValidTokenController::class, "checkIsValidToken"]);
});

Route::group(['prefix' => 'companies'], function () {
    Route::get('/', [CompanyController::class, "all"])->name('companies.index');
    Route::get('logs/{id}', [CompanyController::class, "logs"])->name('companies.logs');
    Route::get('/{id}', [CompanyController::class, "find"])->name('companies.show');
    Route::post('/', [CompanyController::class, "create"])->name('companies.store');
    Route::put('/{id}', [CompanyController::class, "update"])->name('companies.update');
    Route::delete('/{id}', [CompanyController::class, "destroy"])->name('companies.delete');
    Route::post('bulk-delete', [CompanyController::class, 'bulkDelete']);
});

Route::post('/companyModules/{id}', [CompanyController::class, "companyModules"]);


Route::group(['prefix' => 'project-program-modules'], function () {

    Route::controller(\App\Http\Controllers\ProjectProgramModule\ProjectProgramModuleController::class)->group(function () {

        Route::get('/get-drop-down', 'DropDown');

        Route::get('/', 'all')->name('project-program-modules.index');

        Route::get('all-company-program/{name_company}', 'getCompanyProjectProgramModules');
        Route::get('find-company-program/{company_id}', 'findProgramModulesCompanyId');
        Route::get('all-program-modules', 'allProgramModuleId');
        Route::get('/root-nodes', 'getRootNodes')->name('project-program-modules.root-nodes');
        Route::get('/child-nodes/{parentId}', 'getChildNodes')->name('project-program-modules.child-nodes');
        Route::get('logs/{id}', 'logs')->name('project-program-modules.logs');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('project-program-modules.create');
        Route::put('/{id}', 'update')->name('project-program-modules.update');
        Route::delete('/{id}', 'delete')->name('modules.destroy');
        Route::post('/company', 'addModuleToCompany')->name('project-program-modules.company.add');
        Route::get('/{module_id}/company/{company_id}', 'removeModuleFromCompany')->name('project-program-modules.company.remove');
        Route::post('bulk-delete', 'bulkDelete');
        Route::post('create-program-children', 'createProgramChildren');
    });
});

// api of Partners
Route::group(['prefix' => 'partners'], function () {
    Route::controller(PartnerController::class)->group(function () {
        Route::get('/', 'all')->name('partners.index');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/profile', 'profile');
            Route::get('/logout', 'logout');
        });

        Route::get('/{id}', 'find');
        Route::get('logs/{id}', "logs");
        Route::post('/', 'store')->name('partners.store');
        Route::put('/{id}', 'update')->name('partners.update');
        Route::delete('/{id}', 'delete')->name('partners.destroy');
        Route::post('/companies', 'companies');
        Route::post('/screen-setting', 'screenSetting')->name('partners.screenSetting');
        Route::get('/get-screen-setting/{user_id}/{screen_id}', 'getScreenSetting')->name('partners.getScreenSetting');
        Route::post('/login', 'login');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

// api for screen setting
Route::controller(MainController::class)->group(function () {
    Route::post("/media", "media");
    Route::post("/setting", "setting");
    Route::get("/setting/{user_id}/{screen_id}", "getSetting");
});

// api of screens
Route::group(['prefix' => 'screens'], function () {
    Route::controller(ScreenController::class)->group(function () {
        Route::get('all-company-screen', 'allCompanyScreen');
        Route::get('/', 'all')->name('screens.index');
        Route::get("logs/{id}", "logs")->name("screens.logs");
        Route::get('/{id}', 'find');
        Route::get('/screen-documents/{id}', 'getScreenDocumentTypes');
        Route::get('/screen-buttons/{id}', 'getScreenButtons');
        Route::post('/', 'store')->name('screens.store');
        Route::put('/{id}', 'update')->name('screens.update');
        Route::delete('/{id}', 'delete')->name('screens.destroy');
        Route::post('bulk-delete', 'bulkDelete');
        Route::post('create-company-screens', 'getCreateCompanyScreen');
        Route::post('create-sub-menu-screens', 'createSubMenuScreen');


        Route::post('create-company-screens-menu', 'getCreateCompanyScreenMenu');

    });
});

Route::group(['prefix' => 'module-screens'], function () {
    Route::controller(ModuleScreenController::class)->group(function () {
        Route::get('/', 'all')->name('screens.index');

    });
});

// api of company_modules
Route::group(['prefix' => 'company-project-program-modules'], function () {
    Route::controller(CompanyProjectProgramModuleController::class)->group(function () {
        Route::get('/', 'all')->name('company_project_program_modules.index');
        Route::get('/{id}', 'find');
        Route::post('/', 'store')->name('company_project_program_modules.store');
        Route::put('/{id}', 'update')->name('company_project_program_modules.update');
        Route::delete('/{id}', 'delete')->name('company_project_program_modules.destroy');
        Route::get('logs/{id}', 'logs')->name('company_project_program_modules.logs');
        Route::post('bulk-delete', 'bulkDelete');

    });
});
// api of helpfiles
Route::group(['prefix' => 'helpfiles'], function () {
    Route::controller(HelpfileController::class)->group(function () {
        Route::get('/', 'all')->name('helpfiles.index');
        Route::get('/{id}', 'find');
        Route::get('/logs/{id}', 'logs');
        Route::post('/', 'store')->name('helpfiles.store');
        Route::post('/{id}', 'update')->name('helpfiles.update');
        Route::delete('/{id}', 'delete')->name('helpfiles.destroy');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

// api of screenhelpfile
Route::group(['prefix' => 'screen-helpfile'], function () {
    Route::controller(ScreenHelpfileController::class)->group(function () {
        Route::get('/', 'all')->name('screenhelpfile.index');
        Route::get("/logs/{id}", "logs")->name("screenhelpfile.logs");
        Route::get('/{id}', 'find');
        Route::post('/', 'store')->name('screenhelpfile.store');
        Route::post('/{id}', 'update')->name('screenhelpfile.update');
        Route::delete('/{id}', 'delete')->name('screenhelpfile.destroy');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

// api of screenbutton
Route::group(['prefix' => 'screen-button'], function () {
    Route::controller(ScreenButtonController::class)->group(function () {
        Route::get('/', 'all')->name('screenbutton.index');
        Route::get("/logs/{id}", "logs")->name("screenbutton.logs");
        Route::get('/screens', 'allScreens')->name('screenbutton.allScreens');
        Route::get('/{id}', 'find');
        Route::post('/', 'store')->name('screenbutton.store');
        Route::post('/{id}', 'update')->name('screenbutton.update');
        Route::delete('/{id}', 'delete')->name('screenbutton.destroy');
        Route::delete('/remove/{screen_id}/{button_id}', "removeScreenFromButton");
        Route::post('bulk-delete', 'bulkDelete');
    });
});

// api of hotfield
Route::group(['prefix' => 'hotfields'], function () {
    Route::controller(HotfieldController::class)->group(function () {
        Route::get('/', 'all')->name('hotfield.index');
        Route::get('/{id}', 'find');
        Route::get('logs/{id}', "logs");
        Route::post('/', 'store')->name('hotfield.store');
        Route::post('/{id}', 'update')->name('hotfield.update');
        Route::delete('/{id}', 'delete')->name('hotfield.destroy');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

// api op serials
Route::group(['prefix' => 'buttons'], function () {
    Route::controller(ButtonController::class)->group(function () {
        Route::get('/', 'all')->name('buttons.index');
        Route::get("/logs/{id}", "logs")->name("buttons.logs");
        Route::get('/{id}', 'find');
        Route::post('/', 'store')->name('buttons.store');
        Route::put('/{id}', 'update')->name('buttons.update');
        Route::delete('/{id}', 'delete')->name('buttons.destroy');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

Route::group(['prefix' => 'settingScreen'], function () {
    Route::controller(SettingScreenController::class)->group(function () {
        Route::get('/', 'all')->name('settingScreen.index');
        Route::get('logs/{id}', 'logs')->name('settingScreen.logs');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('settingScreen.create');
        Route::put('/{id}', 'update')->name('settingScreen.update');
        Route::delete('/{id}', 'delete')->name('settingScreen.destroy');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

Route::group(['prefix' => 'document-type'], function () {
    Route::controller(DocumentTypeController::class)->group(function () {
        Route::get('/', 'all')->name('document.index');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('document.create');
        Route::put('/{id}', 'update')->name('document.update');
        Route::delete('/{id}', 'delete')->name('document.destroy');
        Route::get('logs/{id}', 'logs');
        Route::post('bulk-delete', 'bulkDelete');
    });
});

Route::group(['prefix' => 'screenDocumentType'], function () {
    Route::post('/add', [ScreenController::class, 'addScreenToDocumentType']);
    Route::delete('/remove/{screen_id}/{documentType_id}', [ScreenController::class, 'removeScreenFromDocumentType']);
    Route::get('logs/{id}', [ScreenController::class, 'logs'])->name('screenDocumentType.logs');
});

Route::group(['prefix' => 'menu'], function () {
    Route::controller(\App\Http\Controllers\Menu\MenuController::class)->group(function () {
        Route::get('/', 'all')->name('menus.index');
        Route::get('logs/{id}', 'logs')->name('menus.logs');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('menus.create');
        Route::put('/{id}', 'update')->name('menus.update');
        Route::delete('/{id}', 'delete')->name('menus.destroy');
        Route::post('bulk-delete', 'bulkDelete');

        Route::get('module-menu/{company_id}/{module_id}', 'getModuleMenus');

    });
});

Route::group(['prefix' => 'sub-menus'], function () {
    Route::controller(\App\Http\Controllers\SubMenuController::class)->group(function () {
        Route::get('all-sub-menus', 'allSubMenu');
        Route::get('/', 'all')->name('sub-menus.index');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('sub-menus.create');
        Route::post("bulk-delete", "bulkDelete");
        Route::put('/{id}', 'update')->name('sub-menus.update');
        Route::delete('/{id}', 'delete')->name('sub-menus.destroy');
        Route::get('logs/{id}', 'logs')->name('sub-menus.logs');
        Route::post('create-submenu-menu', 'createSubMenuAndMenu');
    });
});

Route::group(['prefix' => 'folder-menu'], function () {
    Route::controller(\App\Http\Controllers\FolderMenu\FolderMenuController::class)->group(function () {
        Route::get('/', 'all')->name('folder-menu.index');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('folder-menu.create');
        Route::put('/{id}', 'update')->name('folder-menu.update');
        Route::delete('/{id}', 'delete')->name('folder-menu.destroy');
        Route::get('logs/{id}', 'logs')->name('folder-menu.logs');
        Route::post("bulk-delete", "bulkDelete");

    });
});

Route::group(['prefix' => 'program-folder'], function () {
    Route::controller(\App\Http\Controllers\ProgramFolder\ProgramFolderController::class)->group(function () {
        Route::get('/', 'all')->name('program-folder.index');
        Route::get('/{id}', 'find');
        Route::post('/', 'create')->name('program-folder.create');
        Route::put('/{id}', 'update')->name('program-folder.update');
        Route::delete('/{id}', 'delete')->name('program-folder.destroy');
        Route::get('logs/{id}', 'logs')->name('program-folder.logs');
        Route::post("bulk-delete", "bulkDelete");
        Route::post('/update-array', 'updateArray');

    });
});

//----------------------------------------------milad routes ------------------------------
Route::get('everything_about_the_company/{company_id}', [CompanyController::class, 'everything_about_the_company']);
Route::resource('screen-document-type', ScreenDocumentTypeController::class)->except('create', 'edit');
Route::get('screen-document-type/logs/{id}', [ScreenDocumentTypeController::class, 'logs']);
Route::post('screen-document-type/bulk-delete', [ScreenDocumentTypeController::class, 'bulkDelete']);

Route::get('partner-company/{partner_id}', [PartnerController::class, 'getCompany']);
Route::get('com-modules/{company_id}', [CompanyController::class, 'getModules']);
Route::get('statics', [MainController::class, 'statics']);
//----------------------------------------------------------------------------------------------
