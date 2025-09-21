declare module "react-native-paystack-webview" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  export interface PaystackProps {
    paystackKey: string;
    billingEmail: string;
    amount: number;
    currency?: string;
    billingName?: string;
    billingMobile?: string;
    activityIndicatorColor?: string;
    style?: ViewStyle;
    ref?: any;
    onCancel?: (e: any) => void;
    onSuccess?: (res: any) => void;
  }

  export default class PaystackWebView extends Component<PaystackProps> {}
}
