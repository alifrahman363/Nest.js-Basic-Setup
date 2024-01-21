import { Controller, Get, Req, Res, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { Request, Response } from "express";
import { notFound, success, requestInvalid } from "src/helpers/http";
import { SUCCESS, REQUEST_ERROR } from "src/shared/constants/httpCodes";
import { handleInternalError } from "src/shared/error/handleInternalError";
import { ProductDto } from "./products.dto";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll(
        @Req() request: Request,
        @Res() response: Response
    ) {
        try {
            const data: any = await this.productService.findAll();

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            handleInternalError(error, response);
        }
    }

    @Get(':id')
    async findOne(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number
    ) {
        try {
            const data: any = await this.productService.findById(id);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Post('create')
    async create(
        @Req() request: Request,
        @Res() response: Response,
        @Body() productDto: ProductDto
    ) {
        try {
            const data: any = await this.productService.create(productDto);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Put('update/:id')
    async update(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number,
        @Body() productDto: ProductDto,
    ) {
        try {
            const data = await this.productService.update(id, productDto);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Delete('delete/:id')
    async remove(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number
    ) {
        try {
            await this.productService.remove(id);

            return response.status(SUCCESS).json(success({ message: 'Product deleted successfully' }));
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }
}
