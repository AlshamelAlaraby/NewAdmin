<?php

namespace App\Providers;


use App\Repositories\Button\ButtonRepository;
use App\Repositories\Button\ButtonRepositoryInterface;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\Company\CompanyRepository;
use App\Repositories\CompanyProjectProgramModule\CompanyProjectProgramModuleInterface;
use App\Repositories\CompanyProjectProgramModule\CompanyProjectProgramModuleRepository;
use App\Repositories\CompanyProjectProgramModule\CompanyProjectProgramModuleRepositoryInterface;
use App\Repositories\DocumentType\DocumentTypeInterface;
use App\Repositories\DocumentType\DocumentTypeRepository;
use App\Repositories\FolderMenu\FolderMenuInterface;
use App\Repositories\FolderMenu\FolderMenuRepository;
use App\Repositories\Helpfile\HelpfileRepository;
use App\Repositories\Helpfile\HelpfileRepositoryInterface;
use App\Repositories\Hotfield\HotfieldRepository;
use App\Repositories\Hotfield\HotfieldRepositoryInterface;
use App\Repositories\Partner\PartnerRepository;
use App\Repositories\Partner\PartnerRepositoryInterface;
use App\Repositories\ProgramFolder\ProgramFolderInterface;
use App\Repositories\ProgramFolder\ProgramFolderRepository;
use App\Repositories\ProjectProgramModule\ProjectProgramModuleInterface;
use App\Repositories\ProjectProgramModule\ProjectProgramModuleRepository;
use App\Repositories\ScreenButton\ScreenButtonRepository;
use App\Repositories\ScreenButton\ScreenButtonRepositoryInterface;
use App\Repositories\ScreenDocumentType\ScreenDocumentTypeRepository;
use App\Repositories\ScreenDocumentType\ScreenDocumentTypeRepositoryInterface;
use App\Repositories\ScreenHelpfile\ScreenHelpfileRepository;
use App\Repositories\ScreenHelpfile\ScreenHelpfileRepositoryInterface;
use App\Repositories\Screen\ScreenRepository;
use App\Repositories\Screen\ScreenRepositoryInterface;
use App\Repositories\ScreenAttribute\ScreenAttributeInterface;
use App\Repositories\ScreenAttribute\ScreenAttributeRepository;
use App\Repositories\SettingScreen\SettingScreenInterface;
use App\Repositories\SettingScreen\SettingScreenRepository;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(PartnerRepositoryInterface::class, PartnerRepository::class);
        $this->app->bind(ScreenRepositoryInterface::class, ScreenRepository::class);

        $this->app->bind(HelpfileRepositoryInterface::class, HelpfileRepository::class);
        $this->app->bind(CompanyProjectProgramModuleInterface::class, CompanyProjectProgramModuleRepository::class);
        $this->app->bind(CompanyInterface::class, CompanyRepository::class);
        $this->app->bind(ProjectProgramModuleInterface::class, ProjectProgramModuleRepository::class);

        $this->app->bind(ButtonRepositoryInterface::class, ButtonRepository::class);
        $this->app->bind(ScreenHelpfileRepositoryInterface::class, ScreenHelpfileRepository::class);
        $this->app->bind(DocumentTypeInterface::class, DocumentTypeRepository::class);
        $this->app->bind(ScreenButtonRepositoryInterface::class, ScreenButtonRepository::class);
        $this->app->bind(HotfieldRepositoryInterface::class, HotfieldRepository::class);
        $this->app->bind(ScreenDocumentTypeRepositoryInterface::class, ScreenDocumentTypeRepository::class);
        $this->app->bind(SettingScreenInterface::class, SettingScreenRepository::class);

        $this->app->bind(ScreenAttributeInterface::class, ScreenAttributeRepository::class);
        $this->app->bind(FolderMenuInterface::class, FolderMenuRepository::class);
        $this->app->bind(ProgramFolderInterface::class, ProgramFolderRepository::class);

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }
}
