User :
  Doctor        v 
  Patient       v
Appointment     v
Record          v
Profile(Doctor) v
Comment(forDoctor) v  

Patient xem tất các các Doctor - đặt lịch hẹn bodyLichHen : idPatient, idDoctor,date  (V) -> sẽ gửi thông báo cho Doctor 
Patient cũng có thể hủy lịch hẹn dưới 6 tiếng -> sẽ gửi thông báo tới Doctor (v)
Doctor xem tất cả appointment của mình - có thể accept / reject mà appointment của họ (trả về mail của user) (V) - if accept thì phải viết một record healthy cho bênh nhân (V) 
Hẹn giờ (Trước 1 ngày / 12 tiếng) thông báo cuộc hẹn cho Patient và Doctor -> chắc dùng cron (agenda)
Đánh giá bác sĩ sau khi khám (v)

- ĐN, ĐK , change info,xem được appointment của ban thân và có thẻ hủy nếu dưới 6 tiếng (v)










Bầu cử -- Dealine : ...
User : Tên , tuổi , User/pass/, email , sđt , isVote, dateVote
  Delegate : Chức vụ , Cống hiến [], đại giải [], Số phiếu
  Citizen : Số CCCD,  Địa chỉ
Votes : idDelegate , idCitizen

Citizen xem all Delegate , sẽ chọn 1 trong những Delegate (Số phiếu của Delegate + 1)
Khi còn dealine : ko thể sửa , chỉ có thể xóa vote (Số phiếu của Delegate + 1), ròi có thể vote lại
Khi hết dealine : giữ nguyên giá trị
Dùng cron để lưu giá trị người vô địch sau Dealine 