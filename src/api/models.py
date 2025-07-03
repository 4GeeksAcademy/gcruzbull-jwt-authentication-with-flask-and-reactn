from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(50), nullable = False)
    avatar: Mapped[str] = mapped_column(String(120), nullable = False, default = "")
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    salt: Mapped[str] = mapped_column(String(80), nullable = False, default = 1 )

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.first_name,
            "avatar": self.avatar,
            "email": self.email,
            "salt": self.salt,     
            # do not serialize the password, its a security breach
        }