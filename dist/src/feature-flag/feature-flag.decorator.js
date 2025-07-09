"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlag = exports.FEATURE_FLAG_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.FEATURE_FLAG_KEY = 'feature-flag';
const FeatureFlag = (options) => (0, common_1.SetMetadata)(exports.FEATURE_FLAG_KEY, options);
exports.FeatureFlag = FeatureFlag;
//# sourceMappingURL=feature-flag.decorator.js.map