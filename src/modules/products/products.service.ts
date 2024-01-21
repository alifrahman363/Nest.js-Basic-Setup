import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(productDto: ProductDto): Promise<Product> {
        try {
            const product = this.productRepository.create(productDto);
            return await this.productRepository.save(product);
        } catch (error) {
            throw new NotFoundException('Product cannot be created. Please try again.');
        }
    }

    async findAll() {
        try {
            const products = await this.productRepository.find();
            if (products.length === 0) throw new NotFoundException('Products not found');

            return products;
        } catch (error) {
            throw new NotFoundException('Products not found');
        }
    }

    async findById(id: number) {
        try {
            const product = await this.productRepository.findBy({ id: id });
            if (!product) throw new NotFoundException('Product not found');

            return product;
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
    }

    async update(id: number, productDto: ProductDto) {
        try {
            await this.productRepository.update(id, productDto);
            const updatedProduct = await this.productRepository.findBy({ id: id });
            if (!updatedProduct) throw new NotFoundException('Product not found');

            return updatedProduct;
        } catch (error) {
            throw new NotFoundException('Product cannot be updated. Please try again.');
        }
    }

    async remove(id: number): Promise<void> {
        try {
            const result = await this.productRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException('Product not found');
        } catch (error) {
            throw new NotFoundException('Product cannot be deleted. Please try again.');
        }
    }
}
