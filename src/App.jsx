import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationService from './NotificationService.jsx';
import {
  DollarSign, 
  Receipt, 
  BarChart3, 
  UserPlus,
  Search, 
  AlertCircle, 
  Loader2
} from 'lucide-react';

// نموذج التفعيل
function ActivationForm({ onSubmit, onReturn }) {
  const [subscriberName, setSubscriberName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('paid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subscriberName || !amount) {
      alert('الرجاء إدخال جميع البيانات المطلوبة');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        subscriberName,
        amount: Number(amount),
        paymentStatus,
        date: new Date().toISOString()
      });

      setSubscriberName('');
      setAmount('');
      setPaymentStatus('paid');

      alert(paymentStatus === 'unpaid' ? 
        'تم تفعيل الاشتراك وتسجيل المبلغ في الديون' : 
        'تم تفعيل الاشتراك بنجاح'
      );
    } catch (error) {
      alert('حدث خطأ أثناء التفعيل');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 p-4">
        <h2 className="text-2xl text-white font-bold flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6" />
          تفعيل جديد
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم المشترك
            </label>
            <input
              type="text"
              value={subscriberName}
              onChange={(e) => setSubscriberName(e.target.value)}
              className="w-full p-2 border rounded-md text-right"
              placeholder="ادخل اسم المشترك"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              المبلغ المراد
            </label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md text-right"
            >
              <option value="">اختر المبلغ</option>
              <option value="30">40</option>
              <option value="35">35</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              حالة الدفع
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="paid"
                  checked={paymentStatus === 'paid'}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                />
                <span className="text-green-600 font-medium">واصل</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="unpaid"
                  checked={paymentStatus === 'unpaid'}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                />
                <span className="text-red-600 font-medium">غير واصل</span>
              </label>
            </div>
          </div>

          {paymentStatus === 'unpaid' && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-600 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>سيتم تسجيل المبلغ في قائمة الديون</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 p-2 rounded-md text-white flex items-center justify-center gap-2
                ${isSubmitting ? 'bg-emerald-400' : 'bg-emerald-500 hover:bg-emerald-600'}
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري التفعيل...
                </>
              ) : (
                'تفعيل الاشتراك'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => onReturn()}
              className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
            >
              رجوع
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// عرض الديون
function DebtsView({ debts, onReturn }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDebts = debts.filter(debt => 
    debt.subscriberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-700 p-4">
        <h2 className="text-2xl text-white font-bold flex items-center justify-center gap-2">
          <Receipt className="w-6 h-6" />
          قائمة الديون
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4" dir="rtl">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث باسم المشترك..."
              className="w-full p-2 pl-4 pr-10 border rounded-md text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredDebts.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-right">اسم المشترك</th>
                    <th className="p-3 text-right">المبلغ</th>
                    <th className="p-3 text-right">التاريخ</th>
                    <th className="p-3 text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDebts.map((debt, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{debt.subscriberName}</td>
                      <td className="p-3">{debt.amount}</td>
                      <td className="p-3">{new Date(debt.date).toLocaleDateString('ar-SA')}</td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700">
                          غير مسدد
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-md p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>{searchTerm ? 'لا توجد نتائج للبحث' : 'لا توجد ديون مسجلة'}</p>
            </div>
          )}
          
          <button
            onClick={onReturn}
            className="w-full p-2 border rounded-md hover:bg-gray-50"
          >
            عودة للقائمة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}

// عرض التقارير
function ReportsView({ debts, onReturn }) {
  const totalDebts = debts.length;
  const totalAmount = debts.reduce((sum, debt) => sum + Number(debt.amount), 0);
  const averageDebt = totalDebts > 0 ? (totalAmount / totalDebts).toFixed(2) : 0;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4">
        <h2 className="text-2xl text-white font-bold flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6" />
          التقارير
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-6" dir="rtl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-700">عدد الديون</h3>
              <p className="text-2xl font-bold text-purple-600">{totalDebts}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-700">إجمالي المبالغ</h3>
              <p className="text-2xl font-bold text-purple-600">{totalAmount}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <h3 className="text-lg font-bold text-purple-700">متوسط الدين</h3>
              <p className="text-2xl font-bold text-purple-600">{averageDebt}</p>
            </div>
          </div>

          {debts.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-right">اسم المشترك</th>
                    <th className="p-3 text-right">المبلغ</th>
                    <th className="p-3 text-right">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {debts.map((debt, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{debt.subscriberName}</td>
                      <td className="p-3">{debt.amount}</td>
                      <td className="p-3">{new Date(debt.date).toLocaleDateString('ar-SA')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-md p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>لا توجد بيانات للعرض</p>
            </div>
          )}

          <button
            onClick={onReturn}
            className="w-full p-2 border rounded-md hover:bg-gray-50"
          >
            عودة للقائمة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}


// عرض المشتركين الواصلين
function PaidSubscribersView({ subscribers, onReturn }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.subscriberName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
        <h2 className="text-2xl text-white font-bold flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6" />
          قائمة المشتركين الواصلين
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4" dir="rtl">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث باسم المشترك..."
              className="w-full p-2 pl-4 pr-10 border rounded-md text-right"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredSubscribers.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-right">اسم المشترك</th>
                    <th className="p-3 text-right">المبلغ</th>
                    <th className="p-3 text-right">التاريخ</th>
                    <th className="p-3 text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{subscriber.subscriberName}</td>
                      <td className="p-3">{subscriber.amount}</td>
                      <td className="p-3">{new Date(subscriber.date).toLocaleDateString('ar-SA')}</td>
                      <td className="p-3">
                        <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700">
                          واصل
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-md p-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>{searchTerm ? 'لا توجد نتائج للبحث' : 'لا يوجد مشتركين واصلين'}</p>
            </div>
          )}
          
          <button
            onClick={onReturn}
            className="w-full p-2 border rounded-md hover:bg-gray-50"
          >
            عودة للقائمة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}


// القائمة الرئيسية
function MainMenu({ onNavigate, debtsCount = 0, paidCount = 0 }) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          نظام إدارة الاشتراكات
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" dir="rtl">
          <button
            onClick={() => onNavigate('activation')}
            className="flex items-center justify-center gap-4 p-6 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors group"
          >
            <UserPlus className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-medium">تفعيل جديد</span>
          </button>

          <button
            onClick={() => onNavigate('debts')}
            className="flex items-center justify-center gap-4 p-6 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors group relative"
          >
            <Receipt className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-medium">الديون</span>
            {debtsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {debtsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('paidSubscribers')}
            className="flex items-center justify-center gap-4 p-6 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors group relative"
          >
            <UserPlus className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-medium">المشتركين الواصلين</span>
            {paidCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-green-500 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {paidCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('reports')}
            className="flex items-center justify-center gap-4 p-6 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors group"
          >
            <BarChart3 className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-medium">التقارير</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// التطبيق الرئيسي
function App() {
  const [currentView, setCurrentView] = useState('main');
  const [debts, setDebts] = useState([]);
  const [paidSubscribers, setPaidSubscribers] = useState([]); // إضافة state جديد

  const handleActivation = (data) => {
    try {
      if (data.paymentStatus === 'unpaid') {
        setDebts([...debts, data]);
        notificationService.showNotification(
          'إضافة مشترك',
          `تم إضافة ${data.subscriberName} كمشترك غير واصل`
        );
      } else {
        setPaidSubscribers([...paidSubscribers, data]);
        notificationService.showNotification(
          'إضافة مشترك',
          `تم إضافة ${data.subscriberName} كمشترك واصل`
        );
      }
      setCurrentView('main');
    } catch (error) {
      console.error('Error showing notification:', error);
      // إظهار رسالة بديلة في حالة فشل الإشعار
      alert(`تم إضافة المشترك ${data.subscriberName} بنجاح`);
      setCurrentView('main');
    }
  };

  

  const renderView = () => {
    switch (currentView) {
      case 'activation':
        return <ActivationForm onSubmit={handleActivation} onReturn={() => setCurrentView('main')} />;
      case 'debts':
        return <DebtsView debts={debts} onReturn={() => setCurrentView('main')} />;
      case 'reports':
        return <ReportsView debts={debts} onReturn={() => setCurrentView('main')} />;
      case 'paidSubscribers': // إضافة حالة جديدة
        return <PaidSubscribersView subscribers={paidSubscribers} onReturn={() => setCurrentView('main')} />;
      default:
        return <MainMenu 
          onNavigate={setCurrentView} 
          debtsCount={debts.length}
          paidCount={paidSubscribers.length} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        {renderView()}
      </div>
      <ToastContainer 
        position="top-right"
        rtl={true}
        theme="colored"
      />
    </div>
  );
}

export default App;