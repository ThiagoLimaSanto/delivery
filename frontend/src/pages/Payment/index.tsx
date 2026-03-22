import { DeliveryOptions } from '../../components/DeliveryOptions/index.tsx';
import { ManageAddressesModal } from '../../components/ManageAddressesModal/index.tsx';
import { OrderSummary } from '../../components/OrderSummary/Index.tsx';
import { PaymentOptions } from '../../components/PaymentOptions/index.tsx';
import { MainTemplate } from '../../templates/MainTemplate/index.tsx';

export function Payment() {
  return (
    <MainTemplate>
      <>
        <ManageAddressesModal />
        <div className='h-[calc(100vh-80px)] mt-20'>
          <div className='h-full flex justify-center gap-12 xl:gap-30 w-[90%] p-4 mx-auto'>
            <div className='flex flex-col items-center max-w-87.5'>
              <h1 className='text-2xl lg:text-3xl font-bold xl:text-4xl'>
                Finalize seu pedido
              </h1>
              <DeliveryOptions />
              <PaymentOptions />
            </div>
            <OrderSummary />
          </div>
        </div>
      </>
    </MainTemplate>
  );
}
