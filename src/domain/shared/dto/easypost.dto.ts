import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
enum statusEnumScanFormDto {
    creating,
    created,
    failed
}
export class VerificationDetailsDto{
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsString()
    latitude: number;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsString()
    longitude: number;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    time_zone: string;
}
export class FieldErrorDto{
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    field: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    message: string;
}
export class VerificationDto{
    @ApiProperty({
        type: Boolean,
        required: true
    })
    @IsOptional()
    @IsBoolean()
    success: boolean;
    @ApiProperty({
        type: [FieldErrorDto],
        required: true
    })
    @IsOptional()
    @IsObject()
    errors: FieldErrorDto[];
    details: VerificationDetailsDto;
}
export class VerificationsDto{
    @ApiProperty({
        type: VerificationDto,
        required: true
    })
    @IsOptional()
    @IsString()
    zip4: VerificationDto;
    @ApiProperty({
        type: VerificationDto,
        required: true
    })
    @IsOptional()
    @IsString()
    delivery: VerificationDto;
}
export class AddressScanFormDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    object: string;
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    company: string | null;
    @ApiProperty()
    street1: string;
    @ApiProperty()
    street2: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    zip: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    mode: string;
    @ApiProperty()
    carrier_facility: string | null;
    @ApiProperty()
    residential: string | null;
    @ApiProperty()
    federal_tax_id: string | null;
    @ApiProperty()
    state_tax_id: string | null;
    @ApiProperty({
        type: VerificationsDto
    })
    verifications: VerificationsDto
}
export class ScanFormDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    object: string;
    @ApiProperty()
    created_at: string;
    @ApiProperty()
    updated_at: string;
    @ApiProperty()
    tracking_codes: string[];
    @ApiProperty({
        type: AddressScanFormDto
    })
    address: AddressScanFormDto;
    @ApiProperty({
        enum: statusEnumScanFormDto
    })
    status: statusEnumScanFormDto;
    @ApiProperty()
    message: string | null;
    @ApiProperty()
    form_url: string;
    @ApiProperty()
    form_file_type: string | null;
    @ApiProperty()
    batch_id: string;
    @ApiProperty()
    confirmation: string | null;
}
export class RateDto{
    @ApiProperty()
    id: string; /* unique, begins with 'rate_' */
    @ApiProperty()
    object: string; /* "Rate" */
    @ApiProperty()
    mode: string; 	/* "test" or "production" */
    @ApiProperty()
    service: string; /* service level/name => https://www.easypost.com/docs/api/node#service-levels */
    @ApiProperty()
    carrier: string; 	/* name of carrier */
    @ApiProperty()
    carrier_account_id: string; 	/* ID of the CarrierAccount record used to generate this rate */
    @ApiProperty()
    shipment_id: string; /* ID of the Shipment this rate belongs to */
    @ApiProperty()
    rate: string; 	/* the actual rate quote for this service */
    @ApiProperty()
    currency: string; /* currency for the rate */
    @ApiProperty()
    retail_rate: string; /* the retail rate is the in-store rate given with no account */
    @ApiProperty()
    retail_currency: string; /* currency for the retail rate */
    @ApiProperty()
    list_rate: string; /* the list rate is the non-negotiated rate given for having an account with the carrier */
    @ApiProperty()
    list_currency: string; /* currency for the list rate */
    @ApiProperty()
    delivery_days: number; /* delivery days for this service */
    @ApiProperty()
    delivery_date: string; 	/* date for delivery */
    @ApiProperty()
    delivery_date_guaranteed : boolean; /* indicates if delivery window is guaranteed (true) or not (false) */
    @ApiProperty()
    est_delivery_days: number; /* 	*This field is deprecated and should be ignored. */
    @ApiProperty()
    created_at: string;	
    @ApiProperty()
    updated_at: string;	
}
export class CustomItemDto {
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    object: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    description: string;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    quantity: number;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    weight: number;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    value: number;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    hs_tariff_number: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    origin_country: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    created_at: Date;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    updated_at: Date;
}
export class ParcelDto{
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    id: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    object: string;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    length: number;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    width: number;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    height: number;
    predefined_package: string | null;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsOptional()
    @IsNumber()
    weight: number;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    created_at: Date;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    updated_at: Date;
}
export class AddressDto{
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    id: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    object: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    mode: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    created_at: Date;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    updated_at: Date;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    street1: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    street2: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    city: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    state: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    zip: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    country: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    residential: string | null;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    carrier_facility: string | null;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    name: string | null;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    company: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    phone: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    email: string | null;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    federal_tax_id: string | null;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    state_tax_id: string | null;
    @ApiProperty({
        type: VerificationsDto,
        required: true
    })
    @IsOptional()
    @IsString()
    verifications: VerificationsDto
}
export class ShipmentDto {
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    id: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    object: string;
    @ApiProperty({
        type: String,
        required: true
    })
    @IsOptional()
    @IsString()
    mode: string;
    @ApiProperty({
        type: AddressDto,
        required: true
    })
    @IsOptional()
    to_address: AddressDto;
    @ApiProperty({
        type: AddressDto,
        required: true
    })
    @IsOptional()
    from_address: AddressDto;
    @ApiProperty({
        type: ParcelDto,
        required: true
    })
    @IsOptional()
    parcel: ParcelDto;
    @ApiProperty({
        type: CustomItemDto,
        required: true
    })
    customs_info: CustomItemDto;
    @ApiProperty({
        type: [RateDto],
        required: true
    })
    @IsOptional()
    rates: RateDto[];
    @ApiProperty({
        type: [ScanFormDto],
        required: true
    })
    @IsOptional()
    scan_form: ScanFormDto;
    @ApiProperty({
        type: [RateDto],
        required: true
    })
    @IsOptional()
    selected_rate: RateDto;
    @ApiProperty()
    @IsOptional()
    postage_label: any | null;
    @ApiProperty()
    @IsOptional()
    @IsString()
    tracking_code: string | null;
    @ApiProperty()
    @IsOptional()
    @IsString()
    refund_status: string | null;
    @ApiProperty()
    @IsOptional()
    @IsString()
    insurance?: string | null;
    @ApiProperty()
    @IsOptional()
    created_at: Date;
    @ApiProperty()
    @IsOptional()
    updated_at: Date;
}
export class ResponseShipmentDto {
    @ApiProperty()
    statusCode: number;
    @ApiProperty()
    error: boolean
    @ApiProperty({
        type: ShipmentDto,
    })
    data: ShipmentDto
}


export class to_address_dto{
    @ApiProperty()
    name?:string;
    @ApiProperty()
    street1:string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    zip: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    phone: string;
}
export class from_address_dto{
    @ApiProperty()
    street1: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    zip: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    company: string;
    @ApiProperty()
    phone: string;
}
export class parcel_dto {
    @ApiProperty()
    length: number;
    @ApiProperty()
    width: number;
    @ApiProperty()
    height: number;
    @ApiProperty()
    weight: number;
}
export class CreateShipmentEasypostDto {
    @ApiProperty({type: to_address_dto})
    to_address: to_address_dto;
    @ApiProperty({type: from_address_dto})
    from_address: from_address_dto;
    @ApiProperty({type: parcel_dto})
    parcel:parcel_dto;
    @ApiProperty()
    carrier_accounts?: string[]
    @ApiProperty()
    is_return: boolean;
}

export class ValidateAddresDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    street1: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    state?: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    stateIso: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    zip: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    country?: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    countryIso: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
}
export class CreateAddressValidateDto{
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    company: string;
}