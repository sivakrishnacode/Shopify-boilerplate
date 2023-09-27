import {
  Controller,
  Module,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

/* Services */
import { ShopifyExpressService } from '@/utils/shopify-express/shopify-express.service';

// import { AllowRoute } from '@/guards/active-shops.guard';
// import { GaurdException } from '@/exceptions/guard-exception.service';

@Controller('testing-routes')
@Module({
  imports: [ConfigModule],
})
// @UseGuards(AllowRoute)
// @UseFilters(GaurdException)
export class TestingRouteController {
  constructor(
    private readonly configService: ConfigService,
    private readonly shopifyExpressService: ShopifyExpressService,
  ) {}

  @Get('/api')
  sendData(@Req() req: Request, @Res() res: Response) {
    return res
      .status(200)
      .send({ text: `This is coming from ${req.path} route.` });
  }

  @Post('/api')
  postData(@Req() req) {
    return req.body;
  }

  @Get('/api/gql')
  async graphQl(@Req() req, @Res() res): Promise<any> {
    const session = res.locals.shopify.session;

    const client =
      new this.shopifyExpressService.shopifyApp.api.clients.Graphql({
        session,
      });

    const shop = await client.query({
      data: `{
        shop {
          name
        }
      }`,
    });
    res.status(200).send(shop);
  }

  @Get('/api/billing')
  async subscribe(@Req() req, @Res() res): Promise<any> {
    const session = res.locals.shopify.session;

    const client =
      new this.shopifyExpressService.shopifyApp.api.clients.Graphql({
        session,
      });

    const returnUrl = `${this.configService.get<string>(
      'SHOPIFY_APP_URL',
    )}/api/auth?shop=${session.shop}`;
    const planName = '$10.25 plan';
    const planPrice = 10.25; //Always a decimal

    const response = await client.query({
      data: `mutation CreateSubscription {
        appSubscriptionCreate(
          name: "${planName}"
          returnUrl: "${returnUrl}"
          test: true
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: { amount: ${planPrice}, currencyCode: USD }
                }
              }
            }
          ]
        ) {
          userErrors {
            field
            message
          }
          confirmationUrl
          appSubscription {
            id
            status
          }
        }
      }
    `,
    });

    // if (response.body.data.appSubscriptionCreate.userErrors.length > 0) {
    //   console.log(
    //     `--> Error subscribing ${session.shop} to plan:`,
    //     response.body.data.appSubscriptionCreate.userErrors,
    //   );
    //   res.status(400).send({ error: 'An error occured.' });
    //   return;
    // }

    // res.status(200).send({
    //   confirmationUrl: `${response.body.data.appSubscriptionCreate.confirmationUrl}`,
    // });

    console.log({ response });
    return res.status(200).send(response);
  }
}
