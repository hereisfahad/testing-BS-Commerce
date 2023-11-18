import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PERMISSIONS } from 'models';
import { PermissionRequired } from 'src/decorators/permission.decorator';
import { AdminJwtAuthGuard } from 'src/guards/admin-jwt-auth.guard';
import { AdminRoleGuard } from 'src/guards/admin-role.guard';
import { RolesGuard } from 'src/guards/auth.guard';
import { SuperAdminService } from '../service';
import { SuperAdminLoginDto, SuperAdminLoginRes } from './dto/login.dto';
import { SuperAdminSignupReq, SuperAdminSignupRes } from './dto/signup.dto';
import { MfaOtpDto, MfaVerifyOtpDto } from './dto/otp.dto';
import { User as UserInfo } from 'src/decorators/auth.decorator';
import { SuperAdminInfo } from 'src/entity/super-admin';
import { AdminInfo } from 'src/decorators/adminInfo.decorator';

@ApiTags('Super admin controller')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @PermissionRequired(PERMISSIONS.CREATE_ADMIN)
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard, AdminRoleGuard)
  @ApiResponse({
    description: 'Create new admin by super admin',
    type: SuperAdminSignupRes,
  })
  @Post('create')
  async superAdminCreate(
    @AdminInfo() adminInfo: SuperAdminInfo,
    @Body() body: SuperAdminSignupReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.superAdminService.superAdminCreate(
      adminInfo,
      body,
    );
    res.status(code);
    return { code, ...response };
  }

  @Post('login')
  @ApiResponse({ description: 'Login - super admin', type: SuperAdminLoginRes })
  async superAdminLogin(
    @Body() body: SuperAdminLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.superAdminService.superAdminLogin(
      body,
    );
    res.status(code);
    return { code, ...response };
  }

  
  @Post('login/verify-mfa-otp')
  async loginVerifyMfaOtp(
    @Body() body: MfaVerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } =
      await this.superAdminService.verifyMfaLoginOtp(body);
    res.status(code);
    return { code, ...response };
  }

  @PermissionRequired(PERMISSIONS.ADD_MFA)
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard, AdminRoleGuard)
  @Post('add-mfa')
  async addMfa(
    @Body() body: MfaOtpDto,
    @UserInfo() superAdminInfo: SuperAdminInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.superAdminService.sendMfaOtp(
      superAdminInfo.id,
      body,
    );
    res.status(code);
    return { code, ...response };
  }

  @PermissionRequired(PERMISSIONS.VERIFY_OTP_AFTER_ADD_MFA)
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard, AdminRoleGuard)
  @Post('add-mfa/verify-mfa-otp')
  async verifyMfaOtp(
    @Body() body: MfaVerifyOtpDto,
    @UserInfo() superAdminInfo: SuperAdminInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.superAdminService.verifiyMfaOtp(
      superAdminInfo.id,
      body,
    );
    res.status(code);
    return { code, ...response };
  }

  @PermissionRequired(PERMISSIONS.VIEW_OWN_PROFILE)
  @ApiBearerAuth()
  @UseGuards(AdminJwtAuthGuard, AdminRoleGuard)
  @Get('profile')
  async profile(
    @UserInfo() superAdminInfo: SuperAdminInfo,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code, ...response } = await this.superAdminService.getProfileData(
      superAdminInfo.id,
    );
    res.status(code);
    return { code, ...response };
  }
}
