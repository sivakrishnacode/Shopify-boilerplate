import { List, Layout, Text, Box, LegacyCard } from "@shopify/polaris";
import getSymbolFromCurrency from "currency-symbol-map";

const ProgramSummary = (props: any) => {
  const {
    appliesTo,
    isReferringPersonPercentage,
    referringPersonCommissionRate,
    isReferredPersonPercentage,
    referredPersonDiscountRate,
    checkedAffiliateCommission,
    minimumRequirement,
    minimumRequirementAmount,
    minimumRequirementQuantity,
    customerEligibility,
    segment,
    selectedSpecificSegments,
    customer,
    selectedSpecificCustomers,
    limitCodeUsage,
    limitCodeUsageTotal,
    oncePerCustomer,
    productDiscountCombination,
    orderDiscountCombination,
    shippingDiscountCombination,
    storeCurrency,
    isAffiliateCreation,
    referralCode,
    affiliateName,
    affiliateEmail,
  } = props;

  const generateCombinationText = () => {
    if (
      productDiscountCombination &&
      orderDiscountCombination &&
      shippingDiscountCombination
    ) {
      return "Combines with product, order, and shipping discounts";
    } else if (productDiscountCombination && orderDiscountCombination) {
      return "Combines with product and order discounts";
    } else if (productDiscountCombination && shippingDiscountCombination) {
      return "Combines with product and shipping discounts";
    } else if (orderDiscountCombination && shippingDiscountCombination) {
      return "Combines with order and shipping discounts";
    } else if (productDiscountCombination) {
      return "Combines with product discounts";
    } else if (orderDiscountCombination) {
      return "Combines with order discounts";
    } else if (shippingDiscountCombination) {
      return "Combines with shipping discounts";
    } else {
      return "Can’t combine with other discounts";
    }
  };

  return (
    <Box paddingBlockStart="6">
      <LegacyCard sectioned title="Summary">
        <Layout>
          {isAffiliateCreation && (
            <Layout.Section>
              <Text color="subdued" as="h6" fontWeight="semibold">
                {referralCode || "No referral code yet"}
              </Text>
            </Layout.Section>
          )}
          <Layout.Section>
            <Text variant="headingSm" as="h6">
              Type and method
            </Text>
            <br />
            <List type="bullet">
              <List.Item>
                {appliesTo === "all"
                  ? "Amount off orders (Order discount)"
                  : "Amount off products (Product discount)"}
              </List.Item>
              <List.Item>Code</List.Item>
            </List>
          </Layout.Section>
          <Layout.Section>
            <Text variant="headingSm" as="h6">
              Details
            </Text>
            <br />
            <List type="bullet">
              {isAffiliateCreation && (
                <>
                  <List.Item>
                    {affiliateName || (
                      <Text as="p" color="critical">
                        Name is required
                      </Text>
                    )}
                  </List.Item>
                  <List.Item>
                    {affiliateEmail || (
                      <Text as="p" color="critical">
                        Email is required
                      </Text>
                    )}
                  </List.Item>
                </>
              )}
              <List.Item>For Online Store</List.Item>
              <List.Item>
                {isReferringPersonPercentage
                  ? referringPersonCommissionRate + " %"
                  : getSymbolFromCurrency(storeCurrency) +
                    referringPersonCommissionRate}{" "}
                for affiliate commission
              </List.Item>
              <List.Item>
                {isReferredPersonPercentage
                  ? referredPersonDiscountRate + " %"
                  : getSymbolFromCurrency(storeCurrency) +
                    referredPersonDiscountRate}{" "}
                off{" "}
                {appliesTo === "all"
                  ? "customer discount"
                  : appliesTo === "products"
                  ? "products for customer"
                  : "collections for customer"}
              </List.Item>
              <List.Item>
                {checkedAffiliateCommission
                  ? "Calculate commission after taxes & shipping"
                  : "Calculate commission before taxes & shipping"}
              </List.Item>
              {appliesTo !== "all" && (
                <List.Item>Applies to each eligible item per order</List.Item>
              )}
              <List.Item>
                {minimumRequirement === "no"
                  ? "No minimum purchase requirement"
                  : minimumRequirement === "amount"
                  ? `${
                      minimumRequirementAmount > 0 &&
                      `Minimum purchase of ${getSymbolFromCurrency(
                        storeCurrency
                      )} ${minimumRequirementAmount}`
                    }`
                  : `${
                      minimumRequirementQuantity > 0 &&
                      `Minimum purchase of ${minimumRequirementQuantity} ${
                        minimumRequirementQuantity > 1 ? " items" : " item"
                      }`
                    }`}
              </List.Item>

              {customerEligibility === "allCustomers" ? (
                <List.Item>All customers</List.Item>
              ) : customerEligibility === "segments" &&
                selectedSpecificSegments.length > 1 ? (
                <List.Item>
                  For {selectedSpecificSegments.length} customer segments
                </List.Item>
              ) : customerEligibility === "segments" &&
                selectedSpecificSegments.length === 1 ? (
                <List.Item>For {segment[0]}</List.Item>
              ) : customerEligibility === "customer" &&
                selectedSpecificCustomers.length > 1 ? (
                <List.Item>
                  For {selectedSpecificCustomers.length} customers
                </List.Item>
              ) : customerEligibility === "customer" &&
                selectedSpecificCustomers.length === 1 ? (
                <List.Item>For {customer[0]}</List.Item>
              ) : (
                ""
              )}

              {!limitCodeUsage && !oncePerCustomer ? (
                <List.Item>No usage limit</List.Item>
              ) : oncePerCustomer &&
                limitCodeUsage &&
                limitCodeUsageTotal > 0 &&
                limitCodeUsageTotal != "" ? (
                <List.Item>
                  Limit of {limitCodeUsageTotal}{" "}
                  {limitCodeUsageTotal > 1 ? " uses" : " use"}, One use per
                  customer
                </List.Item>
              ) : oncePerCustomer ? (
                <List.Item>One use per customer</List.Item>
              ) : limitCodeUsage && limitCodeUsageTotal > 0 ? (
                <List.Item>
                  Limit of {limitCodeUsageTotal}
                  {limitCodeUsageTotal > 1 ? " uses" : " use"}
                </List.Item>
              ) : (
                ""
              )}

              <List.Item>{generateCombinationText()}</List.Item>
            </List>
          </Layout.Section>
        </Layout>
      </LegacyCard>
    </Box>
  );
};

export default ProgramSummary;
