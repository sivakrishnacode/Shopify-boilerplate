import { Controller, Post, Req, Res } from '@nestjs/common';
import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';
@Controller('graphql')
export class GraphqlController {
  constructor(private shopifyExpressService: ShopifyExpressService) {}
  @Post()
  async graphql(@Req() req, @Res() res) {
    try {
      const session = res.locals.shopify.session;
      const response =
        await this.shopifyExpressService.shopifyApp.api.clients.graphqlProxy({
          session,
          rawBody: req.body,
        });
      console.log({ result: JSON.stringify(response.body) });
      console.log(`---> Successfully got response from GraphQL`);
      return res.status(200).send(response.body);
    } catch (e) {
      console.error(`---> An error occurred at GraphQL Proxy`, e);
      return res.status(403).send(e);
    }
  }
}
