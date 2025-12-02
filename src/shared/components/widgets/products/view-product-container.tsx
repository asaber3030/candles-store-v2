"use client";

import { FullProduct } from "@/entities/product/model/product";
import { ViewProductLeftSide } from "./view-product-left";
import { ViewProductRightSide } from "./view-product-right";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { Separator } from "@/shared/components/ui/separator";
import { ProductReviewsViewer } from "./product-reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useTranslations } from "next-intl";

type Props = {
  product: FullProduct;
};

export const ViewProductContainer = ({ product }: Props) => {
  const t = useTranslations();

  return (
    <DefaultContainer className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side */}
        <ViewProductLeftSide pictures={product.pictures} mainPicture={product.picture} />

        {/* Right Side */}
        <ViewProductRightSide attributes={product.attributes} details={product} sizes={product.sizes} colors={product.colors} />
      </div>
      <Separator className="my-10" />

      <Tabs defaultValue="details">
        <TabsList className="bg-white w-full gap-2">
          <TabsTrigger value="details" className="bg-gray-50">
            {t("Details")}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="bg-gray-50">
            {t("Reviews")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          {product.longDescription && <div dangerouslySetInnerHTML={{ __html: product.longDescription }} className="prose" />}
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviewsViewer productId={product.id} reviews={product.reviews} />
        </TabsContent>
      </Tabs>
    </DefaultContainer>
  );
};
