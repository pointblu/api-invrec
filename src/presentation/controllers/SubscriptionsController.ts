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
import { ISubscriptionsUseCase } from 'application/ports/UseCases/SubscriptionsUseCase/ISubscriptionsUseCase.interface';
import { UnprocessableEntityError } from 'presentation/errors/UnprocessableEntityError';
import { PaginateQueryVM } from 'presentation/view-models/shared/paginateQuery.dto';
import { PagVM } from 'presentation/view-models/shared/PagVM.dto';
import { UpdateSubscriptionsDto } from 'presentation/view-models/subscriptions/updateSubscription.dto';
import { ResponsePagVM } from '../view-models/shared/PagVM.dto';
import { Public } from 'infrastructure/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Subscriptions } from 'infrastructure/database/mapper/Subscriptions.entity';
import { CreateSubscriptionDto } from 'presentation/view-models/subscriptions/createSubscription.dto';
import { ResponseSubscriptionVM } from 'presentation/view-models/subscriptions/subscriptionVM.dto';
import { Roles } from 'infrastructure/decorators/roles.decorator';
import { UserRole } from 'domain/shared/enums/user-role.enum';
import { AuthUser } from 'infrastructure/guards/user.guard';
import { IAuthUserDecorator } from 'infrastructure/guards/user.guard.interface';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly SubscriptionsUseCase: ISubscriptionsUseCase) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Create subscription',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while creating Subscription',
    type: UnprocessableEntityError,
  })
  @ApiResponse({
    description: 'Subscription created',
    type: ResponseSubscriptionVM,
    status: 200,
  })
  async created(@Body() body: CreateSubscriptionDto): Promise<Subscriptions> {
    return await this.SubscriptionsUseCase.createSubscription(body);
  }

  @Get()
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @Roles(UserRole.ADMINISTRATOR)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Find all Subscriptions by paging.',
  })
  @ApiOkResponse({
    description: 'Subscriptions founded.',
    type: ResponsePagVM,
    status: 200,
  })
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  async getSubscriptions(): Promise<Subscriptions[]> {
    return await this.SubscriptionsUseCase.getSubscriptions();
  }

  @Get('/:id')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth('Authorization')
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Find Subscription by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id of subscription',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
  })
  @ApiResponse({
    description: 'Found Subscription',
    type: ResponseSubscriptionVM,
    status: 200,
  })
  async getSubscriptionById(
    @Param('id') subscriptionId: string,
  ): Promise<Subscriptions> {
    return await this.SubscriptionsUseCase.getSubscriptionById(subscriptionId);
  }

  @Put('/:id')
  @ApiBearerAuth('Authorization')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update subscription',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while updating subscription',
    type: UnprocessableEntityError,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of subscription',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
    type: String,
  })
  @ApiResponse({
    description: 'Subscription updated',
    type: ResponseSubscriptionVM,
    status: 200,
  })
  async update(
    @Param('id') subscriptionId: string,
    @Body() body: UpdateSubscriptionsDto,
  ): Promise<Subscriptions> {
    return await this.SubscriptionsUseCase.updateSubscription(
      subscriptionId,
      body,
    );
  }

  @Delete('/:id')
  @ApiBearerAuth('Authorization')
  @Roles(UserRole.ADMINISTRATOR)
  @ApiHeader({ name: 'Authorization', required: true })
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete a subscription',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Validation error while deleting subscription',
    type: UnprocessableEntityError,
  })
  @ApiParam({
    name: 'id',
    description: 'Id of subscription',
    example: '875c18d4-ca31-4eca-a071-7ed942034497',
    type: String,
  })
  @ApiResponse({
    description: 'Removed subscription',
    type: Object,
    status: 200,
  })
  async delete(
    @Param('id') subscriptionId: string,
  ): Promise<{ id?: string; message?: string }> {
    return await this.SubscriptionsUseCase.deleteSubscription(subscriptionId);
  }
}
