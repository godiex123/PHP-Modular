<?php
namespace App\Services;

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

class Mailer
{
    protected PHPMailer $mailer;
    protected string $template;
    protected string $templatePath;

    /**
     * @throws \Exception
     */
    public function __construct()
    {
        $config = config('mail');
        $mailConfig = $config['mailers'][$config['default']];

        $this->template = $config['template'];
        $this->templatePath = $config['template_path'];

        $this->mailer = new PHPMailer(true);

        try {
            // Configuración SMTP
            $this->mailer->isSMTP();
            $this->mailer->Host = $mailConfig['host'];
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = $mailConfig['username'];
            $this->mailer->Password = $mailConfig['password'];
            $this->mailer->SMTPSecure = $mailConfig['encryption'];
            $this->mailer->Port = $mailConfig['port'];

            $this->mailer->setFrom($config['from']['address'], $config['from']['name']);
            $this->mailer->isHTML(true);

        } catch (Exception $e) {
            // Manejar error de configuración
            throw new \Exception("Mailer error: " . $e->getMessage());
        }
    }

    public function send(string $to, string $subject, array $data = []): bool
    {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($to);
            $this->mailer->Subject = $subject;
            $body = $this->loadTemplate($data);
            $this->mailer->Body = $body;

            return $this->mailer->send();
        } catch (Exception $e) {
            return false;
        }
    }

    protected function loadTemplate(array $replacements = []): string
    {
        $file = $this->templatePath . $this->template;
        if (!file_exists($file)) {
            return '';
        }

        $content = file_get_contents($file);

        foreach ($replacements as $key => $value) {
            $content = str_replace('{{'.$key.'}}', $value, $content);
        }

        return $content;
    }
}