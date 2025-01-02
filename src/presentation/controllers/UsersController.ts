import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IUsersUseCase } from 'application/ports/UseCases/UsersUseCase/IUsersUseCase.interface';
import { UnprocessableEntityError } from 'presentation/errors/UnprocessableEntityError';
import { PaginateQueryVM } from 'presentation/view-models/shared/paginateQuery.dto';
import { PagVM } from 'presentation/view-models/shared/PagVM.dto';
import { UpdateUsersDto } from 'presentation/view-models/users/updateUser.dto';
import { ResponsePagVM } from '../view-models/shared/PagVM.dto';
import { Public } from 'infrastructure/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'domain/shared/enums/user-role.enum';
import { Users } from 'infrastructure/database/mapper/Users.entity';
import { CreateUserDto } from 'presentation/view-models/users/createUser.dto';
import { AuthUser } from 'infrastructure/guards/user.guard';
import { IAuthUserDecorator } from 'infrastructure/guards/user.guard.interface';
import { ResponseUserVM } from 'presentation/view-models/users/userVM.dto';
import { Roles } from 'infrastructure/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersUseCase: IUsersUseCase) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating User',
    type: UnprocessableEntityError,
  })
  @ApiResponse({
    description: 'User created',
    type: ResponseUserVM,
    status: 200,
  })
  async created(@Body() body: CreateUserDto): Promise<Users> {
    return await this.UsersUseCase.createUser(body);
  }

  @Get()
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @Roles(UserRole.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Find all Users by paging.',
  })
  @ApiOkResponse({
    description: 'Users founded.',
    type: ResponsePagVM,
    status: 200,
  })
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async getUserspag(@Query() query: PaginateQueryVM): Promise<PagVM<Users>> {
    return await this.UsersUseCase.getUsersPag(query.take, query.pag);
  }

  @Get('/:id')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Find User of id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of user',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
  })
  @ApiResponse({
    description: 'Found User',
    type: ResponseUserVM,
    status: 200,
  })
  async getUserById(@Param('id') userId: string): Promise<Users> {
    return await this.UsersUseCase.getUserById(userId);
  }

  @Get('profile/me')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Profile',
  })
  @ApiResponse({
    description: 'Found User',
    type: ResponseUserVM,
    status: 200,
  })
  async getProfile(@AuthUser() user: IAuthUserDecorator): Promise<Users> {
    return await this.UsersUseCase.getProfile(user._id);
  }

  @Put('/:id')
  @ApiBearerAuth('Authorization')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update user',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while updating user',
    type: UnprocessableEntityError,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of user',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
    type: String,
  })
  @ApiResponse({
    description: 'User updated',
    type: ResponseUserVM,
    status: 200,
  })
  async update(
    @Param('id') userId: string,
    @Body() body: UpdateUsersDto,
  ): Promise<Users> {
    return await this.UsersUseCase.updateUser(userId, body);
  }

  @Delete('/:id')
  @ApiBearerAuth('Authorization')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete a user',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while deleting user',
    type: UnprocessableEntityError,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of user',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
    type: String,
  })
  @ApiResponse({
    description: 'Removed user',
    type: Object,
    status: 200,
  })
  async delete(
    @Param('id') userId: string,
  ): Promise<{ id?: string; message?: string }> {
    return await this.UsersUseCase.deleteUser(userId);
  }
}
