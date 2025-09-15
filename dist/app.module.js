"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const redisStore = require("cache-manager-redis-yet");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const products_module_1 = require("./modules/products/products.module");
const payments_module_1 = require("./modules/payments/payments.module");
const user_entity_1 = require("./modules/users/entities/user.entity");
const product_entity_1 = require("./modules/products/entities/product.entity");
const category_entity_1 = require("./modules/categories/entities/category.entity");
const categories_module_1 = require("./modules/categories/src/modules/categories/categories.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                inject: [config_1.ConfigService],
                useFactory: async (cfg) => ({
                    store: redisStore.redisStore,
                    socket: {
                        host: cfg.get('REDIS_HOST', 'localhost'),
                        port: parseInt(cfg.get('REDIS_PORT', '6379'), 10),
                    },
                    ttl: 60,
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cfg) => ({
                    type: 'postgres',
                    host: cfg.get('DB_HOST', 'localhost'),
                    port: parseInt(cfg.get('DB_PORT', '5432'), 10),
                    username: cfg.get('DB_USER', 'postgres'),
                    password: cfg.get('DB_PASS', 'postgres'),
                    database: cfg.get('DB_NAME', 'autostore'),
                    entities: [user_entity_1.User, product_entity_1.Product, category_entity_1.Category],
                    synchronize: true,
                    logging: false,
                }),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
            payments_module_1.PaymentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map